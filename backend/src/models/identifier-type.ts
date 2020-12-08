import { Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Node } from './node';
import { Relationship } from './relationship';

@ObjectType()
export class IdentifierType extends Node {
  @Field(() => ID)
  @Column()
  public collectionId!: string;

  @Field({ nullable: true })
  @Column({ default: null, nullable: true })
  public displayName?: string;

  @Field()
  @Column()
  public identifier!: string;

  @Field(() => [ Relationship ], { nullable: true })
  public relationships?: Relationship[];
}
