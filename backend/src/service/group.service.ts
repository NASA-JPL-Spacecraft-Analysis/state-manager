import { Service } from 'typedi';

import { Event, GroupMapping, GroupMappingItemUnion, InformationType, State } from '../models';

@Service()
export class GroupService {
  /**
   * Gets a list of group mappings, sorted ASC by their sortOrder.
   *
   * @param groupId The ID of the group we are getting the mappings for.
   * @returns A list of sorted group mappings.
   */
  public async getGroupMappings(groupId: string): Promise<GroupMapping[]> {
    return GroupMapping.find({
      where: {
        groupId
      },
      order: {
        sortOrder: 'ASC'
      }
    });
  }

  public async getItemByMapping(groupMapping: GroupMapping): Promise<typeof GroupMappingItemUnion | undefined> {
    const event = await Event.findOne({ where: { id: groupMapping.itemId }});

    if (event) {
      return event;
    }

    const informationType = await InformationType.findOne({ where: { id: groupMapping.itemId }});

    if (informationType) {
      return informationType;
    }

    const state = await State.findOne({ where: { id: groupMapping.itemId }});

    if (state) {
      return state;
    }

    return undefined;
  }
}
