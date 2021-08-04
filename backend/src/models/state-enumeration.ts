import { Entity, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Node } from './node';

@Entity('state_enumerations')
@ObjectType()
export class StateEnumeration extends Node {
  @Field()
  @Column()
  public collectionId: string;

  @Field()
  @Column()
  public label: string;

  @Field(() => ID, { nullable: true })
  @Column()
  public stateId?: string;

  @Field()
  @Column()
  public value: string;
}

@Entity('state_enumeration_history')
@ObjectType()
export class StateEnumerationHistory extends StateEnumeration {
  @Column()
  @Field(() => ID)
  public stateEnumerationId!: string;

  @Column()
  @Field(() => Date)
  public updated!: Date;
}
