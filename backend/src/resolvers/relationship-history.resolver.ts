import { Resolver, Query, Args } from 'type-graphql';

import { CollectionIdArgs } from '../args';
import { RelationshipHistory } from '../models';

@Resolver()
export class RelationshipHistoryResolver {
  @Query(() => [ RelationshipHistory ])
  public relationshipHistory(@Args() { collectionId }: CollectionIdArgs): Promise<RelationshipHistory[]> {
    return RelationshipHistory.find({
      where: {
        collectionId
      }
    });
  }
}
