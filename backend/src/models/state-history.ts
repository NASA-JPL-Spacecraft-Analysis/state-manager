import { Entity, Column } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { State } from './state';

@Entity('state_history')
@ObjectType()
export class StateHistory extends State {
  @Field(() => ID)
  @Column()
  public stateId!: string;

  @Field(() => Date)
  @Column()
  public updated!: Date;
}
