import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { IdentifierType } from './identifier-type';

@Entity({
  name: 'constraints',
  orderBy: {
    identifier: 'ASC'
  }
})
@ObjectType()
export class Constraint extends IdentifierType {}

@Entity('constraint_history')
@ObjectType()
export class ConstraintHistory extends Constraint {
  @Column()
  @Field(() => ID)
  public constraintId!: string;

  @Column()
  @Field(() => Date)
  public updated!: Date;
}
