import { Resolver, Query, Args } from 'type-graphql';

import { CollectionIdArgs } from '../args';
import { StateHistory } from '../models';

@Resolver()
export class StateHistoryResolver {
  @Query(() => [ StateHistory ])
  public stateHistory(@Args() { collectionId }: CollectionIdArgs): Promise<StateHistory[]> {
    return StateHistory.find({
      where: {
        collectionId
      }
    });
  }
}
