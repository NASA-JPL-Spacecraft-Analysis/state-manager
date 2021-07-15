import { Entity, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

// This fixes the circular dependency import issue by importing all our models at once.
import * as Models from './';
import { Node } from './node';

@Entity('relationships')
@ObjectType()
export class Relationship extends Node {
  @Column()
  @Field(() => ID)
  public collectionId!: string;

  @Column({ default: null, nullable: true })
  @Field({ nullable: true })
  public description?: string;

  @Column({ default: null, nullable: true })
  @Field({ nullable: true })
  public displayName?: string;

  @Field(() => Models.IdentifierTypeUnion, { nullable: true })
  public subject?: typeof Models.IdentifierTypeUnion;

  @Column()
  @Field()
  public subjectType!: string;

  @Column()
  @Field(() => ID)
  public subjectTypeId!: string;

  @Field(() => Models.IdentifierTypeUnion, { nullable: true })
  public target?: typeof Models.IdentifierTypeUnion;

  @Column()
  @Field()
  public targetType!: string;

  @Column()
  @Field(() => ID)
  public targetTypeId!: string;
}

@Entity({
  name: 'relationship_history',
  orderBy: {
    updated: 'DESC'
  }
})
@ObjectType()
export class RelationshipHistory extends Relationship {
  @Column()
  @Field(() => ID)
  public relationshipId!: string;

  @Column()
  @Field(() => Date)
  public updated!: Date;
}
