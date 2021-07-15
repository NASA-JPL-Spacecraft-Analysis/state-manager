import { Field, ObjectType } from 'type-graphql';

import { Constraint } from '../models';
import { Response } from './response';

@ObjectType()
export class ConstraintResponse extends Response {
  @Field(() => Constraint, { nullable: true })
  public constraint?: Constraint;
}

@ObjectType()
export class ConstraintsResponse extends Response {
  @Field(() => [ Constraint ], { nullable: true })
  public constraints?: Constraint[];
}
