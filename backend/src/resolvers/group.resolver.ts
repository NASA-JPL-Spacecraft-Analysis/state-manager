import { UserInputError } from 'apollo-server';
import { Arg, Args, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql';

import { CollectionIdArgs, IdArgs } from '../args';
import { CollectionConstants, GroupConstants } from '../constants';
import { CreateGroupInput, UpdateGroupInput, UploadGroupsInput } from '../inputs';
import { CreateGroupMappingInput } from '../inputs/group/create-group-mapping-input';
import { Collection, Group, GroupMapping } from '../models';
import { GroupResponse, GroupsResponse, Response } from '../responses';
import { GroupService, IdentifierTypeService } from '../service';

@Resolver(() => Group)
export class GroupResolver implements ResolverInterface<Group> {
  constructor(
    private readonly groupService: GroupService,
    private readonly identifierTypeService: IdentifierTypeService
  ) {}

  @Mutation(() => GroupResponse)
  public async createGroup(@Arg('data') data: CreateGroupInput): Promise<GroupResponse> {
    try {
      const group = Group.create(data);

      void this.checkForDuplicateGroupName(group.collectionId, group.id, [ group.name ]);

      await group.save();

      group.groupMappings = await this.createNewGroupMappings(data.groupMappings, group.id);

      return {
        group,
        message: 'Group Created',
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
      const groupNames = [];

      for (const group of data.groups) {
        groupNames.push(group.name);
      }

      await this.checkForDuplicateGroupName(data.collectionId, undefined, groupNames);

      const createdGroups: Group[] = [];

      for (const group of data.groups) {
        let newGroup = Group.create();

        newGroup.name = group.name;
        newGroup.collectionId = data.collectionId;
        newGroup.groupMappings = [];
        newGroup = await newGroup.save();

        createdGroups.push(newGroup);

        for (const mapping of group.groupMappings) {
          let newMapping = GroupMapping.create({
            groupId: newGroup.id,
            sortOrder: mapping.sortOrder
          });

          const item =
            await
            this.identifierTypeService.findItemByIdentifierAndType(data.collectionId, mapping.itemIdentifier, mapping.itemType);

          if (item) {
            newMapping.itemId = item.id;

            newMapping = await newMapping.save();

            newGroup.groupMappings.push(newMapping);
          }
        }
      }

      return {
        groups: createdGroups,
        message: 'Groups Created',
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
    } catch (error) {
      return {
        message: error,
        success: false
      };
    }

    return {
      message: 'Group Deleted',
      success: true
    };
  }

  @Query(() => Group)
  public group(@Arg('collectionId') collectionId: string, @Arg('name') name: string): Promise<Group | undefined> {
    return this.findGroupByName(collectionId, name);
  }

  @FieldResolver()
  public async groupMappings(@Root() group: Group): Promise<GroupMapping[]> {
    return this.groupService.getGroupMappings(group.id);
  }

  @Query(() => [ Group ])
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

      void this.checkForDuplicateGroupName(group.collectionId, group.id, [ group.name ]);

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
      for (const itemId of Object.keys(groupMappingsMap)) {
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
        message: 'Group Updated',
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
   * This method queries the DB for a collection and a collection's groups and then checks the incoming list of names
   * for a duplicate.
   *
   * @param collectionId The ID of the collection we're looking at.
   * @param groupNames A list of group names that we should check for.
   */
  private async checkForDuplicateGroupName(collectionId: string, groupId: string | undefined, groupNames: string[]): Promise<void> {
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
      for (const name of groupNames) {
        if (collectionGroup.name === name && collectionGroup.id !== groupId) {
          throw new UserInputError(GroupConstants.duplicateGroupNameError(name));
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

  private findGroupByName(collectionId: string, name: string): Promise<Group | undefined> {
    return Group.findOne({
      where: {
        collectionId,
        enabled: true,
        name
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
