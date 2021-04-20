import { FieldResolver, Resolver, ResolverInterface, Root } from 'type-graphql';

import { Event, GroupMapping, GroupMappingItemUnion, InformationType, State } from '../models';
import { GroupService } from '../service';

@Resolver(() => GroupMapping)
export class GroupMappingResolver implements ResolverInterface<GroupMapping> {
  constructor(
    private readonly groupService: GroupService
  ) {}

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
