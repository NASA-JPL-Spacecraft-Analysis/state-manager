import { Field, ID, ObjectType } from 'type-graphql';

import { Response } from './response';

@ObjectType()
export class DeleteItemsResponse extends Response {
  @Field(() => [ ID ], { nullable: true })
  public deletedIds?: string[];
}
