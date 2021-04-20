import { UserInputError } from 'apollo-server';
import { Arg, Args, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql';

import { CollectionIdArgs } from '../args';
import { CreateGroupInput, UpdateGroupInput, UploadGroupsInput } from '../inputs';
import { CreateGroupMappingInput } from '../inputs/group/create-group-mapping-input';
import { Collection, Group, GroupMapping } from '../models';

@Resolver(() => Group)
export class GroupResolver implements ResolverInterface<Group> {
  @Mutation(() => Group)
  public async createGroup(@Arg('data') data: CreateGroupInput): Promise<Group> {
    const group = Group.create(data);

    this.checkForDuplicateGroupName(group.collectionId, [ group.name ]);

    await group.save();

    group.groupMappings = await this.createNewGroupMappings(data.groupMappings, group.id);

    return group;
  }

  @Mutation(() => [ Group ])
  public createGroups(@Arg('data') data: UploadGroupsInput): Promise<Group[]> {
    const groupNames = [];

    for (const group of data.groups) {
      groupNames.push(group.name);
    }

    this.checkForDuplicateGroupName(data.collectionId, groupNames);

    for (const group of data.groups) {
      for (const mapping of group.groupMappings) {
      }
    }

    return this.groups({ collectionId: data.collectionId });
  }

  @Query(() => Group)
  public group(@Arg('collectionId') collectionId: string, @Arg('name') name: string): Promise<Group | undefined> {
    return this.findGroupByName(collectionId, name);
  }

  @FieldResolver()
  public async groupMappings(@Root() group: Group): Promise<GroupMapping[]> {
    return GroupMapping.find({
      where: {
        groupId: group.id
      }
    });
  }

  @Query(() => [ Group ])
  public groups(@Args() { collectionId }: CollectionIdArgs): Promise<Group[]> {
    return this.findGroupsByCollectionId(collectionId);
  }

  @Mutation(() => Group)
  public async updateGroup(@Arg('data') data: UpdateGroupInput): Promise<Group> {
    const group = await Group.findOne(data.id);

    if (!group) {
      throw new UserInputError(`A group with id ${data.id} does not exist, please pass a valid group id and try again`);
    }

    Object.assign(group, data);

    this.checkForDuplicateGroupName(group.collectionId, [ group.name ]);

    await group.save();

    group.groupMappings = await GroupMapping.find({
      where: {
        groupId: group.id
      }
    });

    // Create and populate a set of the incoming group mappings.
    const groupMappingsSet = new Set<string>();

    for (const mapping of data.groupMappings) {
      groupMappingsSet.add(mapping.itemId);
    }

    // Loop over our existing group mappings to see what needs to be saved or deleted.
    for (const mapping of group.groupMappings) {
      // If the incoming list has the group mapping, remove it from the set and do nothing.
      if (groupMappingsSet.has(mapping.itemId)) {
        groupMappingsSet.delete(mapping.itemId);
      } else {
        // If we don't see the item in the incoming mapping list, delete it from the group.
        await mapping.remove();
      }
    }

    // Look at the remaining mappings, save them all to the group.
    for (const itemId of groupMappingsSet) {
      const groupMapping = GroupMapping.create({
        groupId: group.id,
        itemId
      });

      await groupMapping.save();
    }

    group.groupMappings = await GroupMapping.find({
      where: {
        groupId: group.id
      }
    });

    return group;
  }

  /**
   * This method queries the DB for a collection and a collection's groups and then checks the incoming list of names
   * for a duplicate.
   * @param collectionId The ID of the collection we're looking at.
   * @param groupNames A list of group names that we should check for.
   */
  private async checkForDuplicateGroupName(collectionId: string, groupNames: string[]): Promise<void> {
    const collection = await Collection.findOne({
      where: {
        id: collectionId
      }
    });

    if (!collection) {
      throw new UserInputError(`A collection with id ${collectionId} does not exist, please pass a valid collection id and try again`);
    }

    const collectionGroups = await this.findGroupsByCollectionId(collectionId);

    for (const collectionGroup of collectionGroups) {
      for (const name of groupNames) {
        if (collectionGroup.name === name) {
          throw new UserInputError(`A group with name "${name}" already exists in this colleciton, please change the name and try again`);
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
        name
      }
    });
  }

  private findGroupsByCollectionId(collectionId: string): Promise<Group[]> {
    return Group.find({
      where: {
        collectionId
      }
    });
  }
}
