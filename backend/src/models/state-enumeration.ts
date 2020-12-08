import { Entity, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Node } from './node';

/**
 * We don't extend node here because InputTypes don't inherit properties from interfaces.
 */
@Entity('state_enumerations')
@ObjectType()
export class StateEnumeration extends Node {
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
