import { UserInputError } from 'apollo-server';
import { Arg, Args, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql';

import { CollectionIdArgs } from '../args';
import { AddItemToGroupInput, CreateGroupInput } from '../inputs';
import { Collection, Group, GroupMapping } from '../models';

@Resolver(() => Group)
export class GroupResolver implements ResolverInterface<Group> {
  @Mutation(() => GroupMapping)
  public async addItemToGroup(@Arg('data') data: AddItemToGroupInput): Promise<GroupMapping[]> {
    const group = await Group.findOne({
      id: data.groupId
    });

    if (!group) {
      throw new UserInputError(`A group with the id "${data.groupId} does not exist, please pass a valid id and try again`);
    }

    return await this.createNewGroupMappings(group);
  }

  @Mutation(() => Group)
  public async createGroup(@Arg('data') data: CreateGroupInput): Promise<Group> {
    const collection = await Collection.findOne({
      where: {
        id: data.collectionId
      }
    });

    if (!collection) {
      throw new UserInputError(`A collection with id ${data.collectionId} does not exist, please pass a valid collection id and try again`);
    }

    const collectionGroups = await this.findGroupsByCollectionId(data.collectionId);

    for (const collectionGroup of collectionGroups) {
      if (collectionGroup.name === data.name) {
        throw new UserInputError(`A group with name "${data.name}" already exists in this colleciton, please change the name and try again`);
      }
    }

    const group = Group.create(data);
    await group.save();

    group.groupMappings = await this.createNewGroupMappings(group);

    return group;
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

  private async createNewGroupMappings(group: Group): Promise<GroupMapping[]> {
    const groupMappings: GroupMapping[] = [];

    // TODO: Right now we're not doing any validation on the incoming item id, think about a way to check this.

    for (const groupMapping of group.groupMappings) {
      const newGroupMapping = GroupMapping.create(groupMapping);
      newGroupMapping.groupId = group.id;

      await newGroupMapping.save();
    }


    return groupMappings;
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
