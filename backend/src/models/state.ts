import { Entity, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { IdentifierType } from './identifier-type';
import { StateEnumeration } from './state-enumeration';

@Entity({
  name: 'states',
  orderBy: {
    identifier: 'ASC'
  }
})
@ObjectType()
export class State extends IdentifierType {
  @Column({ default: null, nullable: true })
  @Field({ nullable: true })
  // TODO: Ask Dan what we should rename this field to.
  public channelId?: string;

  @Column({ default: null, nullable: true })
  @Field({ nullable: true })
  // TODO: Ask Dan what we should rename this field to.
  public dataType?: string;

  @Column({ default: null, nullable: true })
  @Field({ nullable: true })
  public source?: string;

  @Field(() => [ StateEnumeration ])
  public enumerations!: StateEnumeration[];

  @Column({ default: null, nullable: true })
  @Field({ nullable: true })
  public subsystem?: string;

  @Column({ default: false })
  @Field()
  public restricted!: boolean;

  @Column({ default: null, nullable: true })
  @Field({ nullable: true })
  public units?: string;
}

@Entity({
  name: 'state_history',
  orderBy: {
    updated: 'DESC'
  }
})
@ObjectType()
export class StateHistory extends State {
  @Column()
  @Field(() => ID)
  public stateId!: string;

  @Column()
  @Field(() => Date)
  public updated!: Date;
}

export const stateTypes: Set<string> = new Set([
  'alarm_limit',
  'channel',
  'fsw_parameter',
  'model_input',
  'predict',
  'trend',
  'user'
]);
