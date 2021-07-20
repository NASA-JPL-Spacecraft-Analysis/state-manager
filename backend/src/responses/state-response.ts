import { Field, ID, ObjectType } from 'type-graphql';

import { Response } from './response';
import { State } from '../models';

@ObjectType()
export class DeleteEnumerationsResponse extends Response {
  @Field(() => [ ID ], { nullable: true })
  public deletedEnumerationIds?: string[];
}

@ObjectType()
export class StateResponse extends Response {
  @Field(() => State, { nullable: true })
  public state?: State;
}

@ObjectType()
export class StatesResponse extends Response {
  @Field(() => [ State ], { nullable: true })
  public states?: State[];
}
