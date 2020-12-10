import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { Node } from './node';
import { State } from './state';

@Entity('collections')
@ObjectType()
export class Collection extends Node {
  @Column()
  @Field()
  public enabled!: boolean;

  @Column()
  @Field({ defaultValue: true })
  public name!: string;

  @Field(() => [ State ])
  public states: State[];
}
