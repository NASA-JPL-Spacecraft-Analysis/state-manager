import { FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';

import { Event, GroupMapping, GroupMappingItemUnion, InformationType, State } from '../models';

@Resolver(() => GroupMapping)
export class GroupMappingResolver implements ResolverInterface<GroupMapping> {
  @FieldResolver()
  public async item(@Root() groupMapping: GroupMapping): Promise<typeof GroupMappingItemUnion | undefined> {
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