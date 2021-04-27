import { UserInputError } from 'apollo-server-errors';
import { Arg, FieldResolver, Mutation, Resolver, ResolverInterface, Root } from 'type-graphql';
import { UploadGroupMappingsInput } from '../inputs/group/upload-group-mappings-input';

import { Group, GroupMapping, GroupMappingItemUnion } from '../models';
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
      const createdGroupMappings: GroupMapping[] = [];

      for (const groupMapping of data.groupMappings) {
        const group = await Group.findOne({ where: { name: groupMapping.name }});

        if (!group) {
          throw new UserInputError(`A group with the name ${groupMapping.name} does not exist, please supply a valid group name and try again`);
        }

        let newMapping = GroupMapping.create();

        let item = await this.identifierTypeService.findItemByIdentifierAndType(data.collectionId, groupMapping.itemIdentifier, groupMapping.itemType);

        if (item) {
          newMapping.itemId = item.id;
          newMapping.groupId = group.id;

          newMapping = await newMapping.save();

          createdGroupMappings.push(newMapping);
        }
      }

      return {
        groupMappings: createdGroupMappings,
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
}
