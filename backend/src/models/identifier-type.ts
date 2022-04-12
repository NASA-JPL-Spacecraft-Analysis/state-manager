import { Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Node } from './node';
import { Relationship } from './relationship';

@ObjectType()
export class IdentifierType extends Node {
  @Column()
  @Field(() => ID)
  public collectionId!: string;

  @Field(() => String, { nullable: true })
  @Column({ default: null, nullable: true })
  public description?: string;

  @Column({ default: null, nullable: true })
  @Field({ nullable: true })
  public displayName?: string;

  @Column({ default: true })
  @Field()
  public editable!: boolean;

  @Field(() => String, { nullable: true })
  @Column({ default: null, nullable: true })
  public externalLink?: string;

  @Column()
  @Field()
  public identifier!: string;

  @Field(() => [ Relationship ], { nullable: true })
  public relationships?: Relationship[];

  @Column()
  @Field()
  public type!: string;

  @Field(() => String, { nullable: true })
  @Column({ default: null, nullable: true })
  public version?: string;
}
