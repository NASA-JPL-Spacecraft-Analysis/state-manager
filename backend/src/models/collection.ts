import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { Node } from './node';
import { Group } from './group';
import { State } from './state';
import { Event } from './event';
import { Relationship } from './relationship';
import { Constraint } from './constraint';
import { InformationType } from './information-type';

@Entity('collections')
@ObjectType()
export class Collection extends Node {
  @Field(() => [ Constraint ], { nullable: true })
  public constraints?: Constraint[];

  @Column()
  @Field()
  public enabled!: boolean;

  @Column()
  @Field({ defaultValue: true })
  public name!: string;

  @Field(() => [ Group ], { nullable: true })
  public groups?: Group[];

  @Field(() => [ Event ], { nullable: true })
  public events?: Event[];

  @Field(() => [ InformationType ], { nullable: true })
  public informationTypes?: InformationType[];

  @Field(() => [ Relationship ], { nullable: true })
  public relationships?: Relationship[];

  @Field(() => [ State ], { nullable: true })
  public states?: State[];
}
