import { Args, Query, Resolver } from 'type-graphql';

import { CollectionIdArgs } from '../args';
import { EventHistory } from '../models';

@Resolver()
export class EventHistoryResolver {
  @Query(() => [ EventHistory ])
  public eventHistory(@Args() { collectionId }: CollectionIdArgs): Promise<EventHistory[]> {
    return EventHistory.find({
      where: {
        collectionId
      }
    });
  }
}
