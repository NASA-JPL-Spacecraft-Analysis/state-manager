import { Service } from 'typedi';

import { Event, GroupMapping, GroupMappingItemUnion, InformationType, State } from '../models';

@Service()
export class GroupService {
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
