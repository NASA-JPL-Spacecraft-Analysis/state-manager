import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { IdentifierType } from './identifier-type';

@Entity('constraints')
@ObjectType()
export class Constraint extends IdentifierType {
  @Column({ default: null, nullable: true })
  @Field(() => String, { nullable: true })
  public description: string;
}

@Entity('constraint_history')
@ObjectType()
export class ConstraintHistory extends Constraint {
  @Field(() => ID)
  @Column()
  public constraintId!: string;

  @Field(() => Date)
  @Column()
  public updated!: Date;
}

export const constraintTypes: Set<string> = new Set([
  'flight_rule_check',
  'downlink_rule_check',
  'channel_alarm'
]);
