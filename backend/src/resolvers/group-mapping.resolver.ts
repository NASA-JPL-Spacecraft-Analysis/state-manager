import { UserInputError } from 'apollo-server-errors';
import { Arg, FieldResolver, Mutation, Resolver, ResolverInterface, Root } from 'type-graphql';

import { GroupConstants } from '../constants';
import { UploadGroupMappingsInput } from '../inputs/group/upload-group-mappings-input';
import { Group, GroupMapping, GroupMappingUnion, GroupType } from '../models';
import { GroupMappingResponse } from '../responses';
import { GroupService } from '../service';

@Resolver(() => GroupMapping)
export class GroupMappingResolver implements ResolverInterface<GroupMapping> {
  constructor(
    private readonly groupService: GroupService
  ) {}

  @Mutation(() => GroupMappingResponse)
  public async createGroupMappings(@Arg('data') data: UploadGroupMappingsInput): Promise<GroupMappingResponse> {
    try {
      // Keep a list of the mappings we are trying to save.
      const groupMappingsToSave: GroupMapping[] = [];
      // Keep track of our groups by identifier.
      const groupMap = new Map<string, Group>();

      for (const groupMapping of data.groupMappings) {
        let group: Group | undefined;

        // Find the group that our mapping is trying to bind to.
        if (groupMapping.identifier && groupMap.get(groupMapping.identifier)) {
          group = groupMap.get(groupMapping.identifier);
        } else {
          group = await Group.findOne({
            where: {
              collectionId: data.collectionId,
              enabled: true,
              identifier: groupMapping.identifier
            }
          });
        }

        if (group) {
          groupMap.set(group.identifier, group);
        } else {
          throw new UserInputError(
            GroupConstants.groupNotFoundIdentifierError(groupMapping.identifier ? groupMapping.identifier: 'undefined'));
        }

        // Find the item the mapping is trying to bind to.
        const item =
          await this.groupService.findGroupItem(data.collectionId, groupMapping.itemIdentifier, groupMapping.itemType);

        // Check the group's existing mappings to make sure the input list doesn't contain a duplicate.
        if (this.isDuplicateMapping(await GroupMapping.find({ where: { groupId: group.id } }), item)) {
          throw new UserInputError(GroupConstants.duplicateMappingError(groupMapping.itemIdentifier, groupMapping.itemType));
        }

        const newMapping = GroupMapping.create({
          itemId: item.id,
          groupId: group.id,
          sortOrder: groupMapping.sortOrder
        });

        groupMappingsToSave.push(newMapping);
      }

      // Finally, save all our mappings.
      for (let groupMapping of groupMappingsToSave) {
        groupMapping = await groupMapping.save();
      }

      groupMappingsToSave.sort(
        (firstMapping, secondMapping) => {
          if (firstMapping.sortOrder === secondMapping.sortOrder) {
            return 0;
          } else if (firstMapping.sortOrder === null || firstMapping.sortOrder === undefined) {
            return 1;
          } else if (secondMapping.sortOrder === null || secondMapping.sortOrder === undefined) {
            return -1;
          }

          return firstMapping.sortOrder - secondMapping.sortOrder;
        }
      );

      return {
        groupMappings: groupMappingsToSave,
        message: 'Group Mappings Created',
        success: true
      };
    } catch (error: unknown) {
      return {
        message: error,
        success: false
      };
    }
  }

  /**
   * Finds the item attached to a group mapping, and returns the correct value.
   *
   * @param groupMapping
   */
  @FieldResolver()
  public async item(@Root() groupMapping: GroupMapping): Promise<typeof GroupMappingUnion | undefined> {
    return this.groupService.getItemByMapping(groupMapping);
  }

  /**
   * Checks if the passed group already has a mapping to the item being passed.
   *
   * @param group The group we are checking.
   * @param item The item we are looking for.
   * @returns true if there is a duplicate mapping.
   */
  private isDuplicateMapping(existingMappings: GroupMapping[], item: GroupType): boolean {
    if (existingMappings) {
      for (const existingMapping of existingMappings) {
        if (existingMapping.itemId === item.id) {
          return true;
        }
      }
    }

    return false;
  }
}
