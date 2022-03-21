import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';

import { Node } from './node';

@Entity('data_types')
@ObjectType()
export class DataType extends Node {
  @Column()
  @Field()
  public name!: string;

  @Column()
  @Field()
  public type!: string;
}
