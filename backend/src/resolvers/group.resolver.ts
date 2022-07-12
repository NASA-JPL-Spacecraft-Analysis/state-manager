import { UserInputError } from 'apollo-server';
import { Arg, Args, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql';

import { CollectionIdArgs, IdArgs } from '../args';
import { CollectionConstants, GroupConstants } from '../constants';
import { CreateGroupInput, UpdateGroupInput, UploadGroupsInput } from '../inputs';
import { CreateGroupMappingInput } from '../inputs/group/create-group-mapping-input';
import { Collection, Group, GroupMapping } from '../models';
import { DeleteItemsResponse, GroupResponse, GroupsResponse, Response } from '../responses';
import { GroupService } from '../service';

@Resolver(() => Group)
export class GroupResolver implements ResolverInterface<Group> {
  constructor(
    private readonly groupService: GroupService
  ) { }

  @Mutation(() => GroupResponse)
  public async createGroup(@Arg('data') data: CreateGroupInput): Promise<GroupResponse> {
    try {
      const group = Group.create(data);

      await this.checkForDuplicateGroupIdentifier(group.collectionId, group.id, [group.identifier]);

      await group.save();

      group.groupMappings = await this.createNewGroupMappings(data.groupMappings, group.id);

      return {
        group,
        message: group.identifier + ' Created',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @Mutation(() => GroupsResponse)
  public async createGroups(@Arg('data') data: UploadGroupsInput): Promise<GroupsResponse> {
    try {
      const groupIdentifiers = [];

      for (const group of data.groups) {
        groupIdentifiers.push(group.identifier);
      }

      await this.checkForDuplicateGroupIdentifier(data.collectionId, undefined, groupIdentifiers);

      const createdGroups: Group[] = [];

      for (const group of data.groups) {
        let newGroup = Group.create();

        newGroup.identifier = group.identifier;
        newGroup.collectionId = data.collectionId;
        newGroup.groupMappings = [];
        newGroup = await newGroup.save();

        createdGroups.push(newGroup);

        for (const mapping of group.groupMappings) {
          let newMapping = GroupMapping.create({
            groupId: newGroup.id,
            sortOrder: mapping.sortOrder
          });

          const item = await this.groupService.findGroupItem(data.collectionId, mapping.itemIdentifier, mapping.itemType);

          if (item) {
            newMapping.itemId = item.id;

            newMapping = await newMapping.save();

            newGroup.groupMappings.push(newMapping);
          }
        }
      }

      let message: string;

      if (createdGroups.length > 1) {
        message = createdGroups.length.toString() + ' Groups Created';
      } else {
        message = '1 Group Created';
      }

      return {
        groups: createdGroups,
        message,
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @Mutation(() => Response)
  public async deleteGroup(@Args() { id }: IdArgs): Promise<Response> {
    try {
      const group = await Group.findOne({
        where: {
          id
        }
      });

      if (!group) {
        throw new UserInputError(GroupConstants.groupNotFoundError(id));
      }

      group.enabled = false;
      void group.save();

      return {
        message: group.identifier + ' Deleted',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @Mutation(() => DeleteItemsResponse)
  public async deleteAllGroups(@Args() { collectionId }: CollectionIdArgs): Promise<DeleteItemsResponse> {
    try {
      const groups = await Group.find({
        where: {
          collectionId
        }
      });

      const deletedIds: string[] = [];

      for (const group of groups) {
        deletedIds.push(group.id);

        await group.remove();
      }

      return {
        deletedIds,
        message: 'Groups deleted successfully',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  @Query(() => Group)
  public group(@Arg('collectionId') collectionId: string, @Arg('identifier') identifier: string): Promise<Group | undefined> {
    return this.findGroupByIdentifier(collectionId, identifier);
  }

  @FieldResolver()
  public async groupMappings(@Root() group: Group): Promise<GroupMapping[]> {
    return this.groupService.getGroupMappings(group.id);
  }

  @Query(() => [Group])
  public groups(@Args() { collectionId }: CollectionIdArgs): Promise<Group[]> {
    return this.findGroupsByCollectionId(collectionId);
  }

  @Mutation(() => GroupResponse)
  public async updateGroup(@Arg('data') data: UpdateGroupInput): Promise<GroupResponse> {
    try {
      const group = await Group.findOne({
        where: {
          enabled: true,
          id: data.id
        }
      });

      if (!group) {
        throw new UserInputError(GroupConstants.groupNotFoundError(data.id));
      }

      Object.assign(group, data);

      await this.checkForDuplicateGroupIdentifier(group.collectionId, group.id, [group.identifier]);

      await group.save();

      group.groupMappings = await this.groupMappings(group);

      // Create and populate a map of the incoming group mappings.
      const groupMappingsMap = new Map<string, CreateGroupMappingInput>();

      for (const mapping of data.groupMappings) {
        groupMappingsMap.set(mapping.itemId, mapping);
      }

      // Loop over our existing group mappings to see what needs to be saved or deleted.
      for (const mapping of group.groupMappings) {
        // If the incoming list has the group mapping, remove it from the map and do nothing.
        if (groupMappingsMap.get(mapping.itemId)) {
          groupMappingsMap.delete(mapping.itemId);
        } else {
          // If we don't see the item in the incoming mapping list, delete it from the group.
          await mapping.remove();
        }
      }

      // Look at the remaining mappings, save them all to the group.
      for (const itemId of groupMappingsMap.keys()) {
        const groupMapping = GroupMapping.create({
          groupId: group.id,
          itemId: groupMappingsMap.get(itemId)?.itemId,
          sortOrder: groupMappingsMap.get(itemId)?.sortOrder
        });

        await groupMapping.save();
      }

      group.groupMappings = await this.groupService.getGroupMappings(group.id);

      return {
        group,
        message: group.identifier + ' Updated',
        success: true
      };
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }
  }

  /**
   * This method queries the DB for a collection and a collection's groups and then checks the incoming list of identifiers
   * for a duplicate.
   *
   * @param collectionId The ID of the collection we're looking at.
   * @param groupIdentifiers list of group identifiers that we should check for.
   */
  private async checkForDuplicateGroupIdentifier(
    collectionId: string, groupId: string | undefined, groupIdentifiers: string[]): Promise<void> {
    const collection = await Collection.findOne({
      where: {
        id: collectionId
      }
    });

    if (!collection) {
      throw new UserInputError(CollectionConstants.collectionNotFoundError(collectionId));
    }

    const collectionGroups = await this.findGroupsByCollectionId(collectionId);

    for (const collectionGroup of collectionGroups) {
      for (const identifier of groupIdentifiers) {
        if (collectionGroup.identifier === identifier && collectionGroup.id !== groupId) {
          throw new UserInputError(GroupConstants.duplicateGroupIdentifierError(identifier));
        }
      }
    }
  }

  private async createNewGroupMappings(groupMappings: CreateGroupMappingInput[], groupId: string): Promise<GroupMapping[]> {
    const createdGroupMappings: GroupMapping[] = [];

    // TODO: Right now we're not doing any validation on the incoming item id, think about a way to check this.
    for (const groupMapping of groupMappings) {
      const newGroupMapping = GroupMapping.create(groupMapping);
      newGroupMapping.groupId = groupId;

      createdGroupMappings.push(await newGroupMapping.save());
    }

    return createdGroupMappings;
  }

  private findGroupByIdentifier(collectionId: string, identifier: string): Promise<Group | undefined> {
    return Group.findOne({
      where: {
        collectionId,
        enabled: true,
        identifier
      }
    });
  }

  private findGroupsByCollectionId(collectionId: string): Promise<Group[]> {
    return Group.find({
      where: {
        collectionId,
        enabled: true
      }
    });
  }
}
