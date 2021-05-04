import { UserInputError } from 'apollo-server-errors';
import { Arg, FieldResolver, Mutation, Resolver, ResolverInterface, Root } from 'type-graphql';

import { GroupConstants } from '../constants';
import { UploadGroupMappingsInput } from '../inputs/group/upload-group-mappings-input';
import { Group, GroupMapping, GroupMappingItemUnion, IdentifierTypeUnion } from '../models';
import { GroupMappingResponse } from '../responses';
import { GroupService, IdentifierTypeService } from '../service';

@Resolver(() => GroupMapping)
export class GroupMappingResolver implements ResolverInterface<GroupMapping> {
  constructor(
    private readonly groupService: GroupService,
    private readonly identifierTypeService: IdentifierTypeService
  ) {}

  @Mutation(() => GroupMappingResponse)
  public async createGroupMappings(@Arg('data') data: UploadGroupMappingsInput): Promise<GroupMappingResponse> {
    try {
      // Keep a list of the mappings we are trying to save.
      const groupMappingsToSave: GroupMapping[] = [];
      // Keep track of our groups by name.
      const groupMap = new Map<string, Group>();

      for (const groupMapping of data.groupMappings) {
        let group;

        // Find the group that our mapping is trying to bind to.
        if (groupMap.get(groupMapping.name)) {
          group = groupMap.get(groupMapping.name);
        } else {
          group = await Group.findOne({
            where: {
              collectionId: data.collectionId,
              name: groupMapping.name
            }
          });
        }

        if (!group) {
          throw new UserInputError(GroupConstants.groupNotFoundError(groupMapping.name));
        }

        // Find the item the mapping is trying to bind to.
        let item = await this.identifierTypeService.findItemByIdentifierAndType(data.collectionId, groupMapping.itemIdentifier, groupMapping.itemType);

        // Check the group's existing mappings to make sure the input list doesn't contain a duplicate.
        if (this.isDuplicateMapping(await GroupMapping.find({ where: { groupId: group.id } }), item)) {
          throw new UserInputError(GroupConstants.duplicateMappingError(groupMapping.itemIdentifier, groupMapping.itemType));
        }

        let newMapping = GroupMapping.create();

        newMapping.itemId = item.id;
        newMapping.groupId = group.id;

        groupMappingsToSave.push(newMapping);
      }

      // Finally, save all our mappings.
      for (let groupMapping of groupMappingsToSave) {
        groupMapping = await groupMapping.save();
      }

      return {
        groupMappings: groupMappingsToSave,
        message: 'Group Mappings Created',
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
   * Finds the item attached to a group mapping, and returns the correct value.
   * 
   * @param groupMapping
   */
  @FieldResolver()
  public async item(@Root() groupMapping: GroupMapping): Promise<typeof GroupMappingItemUnion | undefined> {
    return this.groupService.getItemByMapping(groupMapping);
  }

  /**
   * Checks if the passed group already has a mapping to the item being passed.
   * 
   * @param group The group we are checking.
   * @param item The item we are looking for.
   * @returns true if there is a duplicate mapping.
   */
  private isDuplicateMapping(existingMappings: GroupMapping[], item: typeof IdentifierTypeUnion): boolean {
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
