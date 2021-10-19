import { Field, ID, ObjectType } from 'type-graphql';

import { Response } from './response';
import { State, StateEnumeration } from '../models';

@ObjectType()
export class DeleteEnumerationsResponse extends Response {
  @Field(() => [ ID ], { nullable: true })
  public deletedEnumerationIds?: string[];
}

@ObjectType()
export class DeleteStatesResponse extends Response {
  @Field(() => [ ID ], { nullable: true })
  public deletedStateIds?: string[];
}

@ObjectType()
export class StateEnumerationResponse extends Response {
  @Field(() => [ StateEnumeration ], { nullable: true })
  public stateEnumerations?: StateEnumeration[];
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
