import { Field, ObjectType } from 'type-graphql';
import { Collection } from '../models';

import { Response } from './response';

@ObjectType()
export class CollectionResponse extends Response{
  @Field(() => Collection, { nullable: true })
  public collection?: Collection;
}
