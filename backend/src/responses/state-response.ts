import { Field, ObjectType } from 'type-graphql';

import { Response } from './response';
import { State, StateEnumeration } from '../models';

@ObjectType()
export class EnumerationsResponse extends Response {
  @Field(() => [ StateEnumeration ], { nullable: true })
  public enumerations?: StateEnumeration[];
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
