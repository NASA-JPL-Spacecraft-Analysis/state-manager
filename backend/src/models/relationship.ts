import { Entity, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

// This fixes the circular dependency import issue by importing all our models at once.
import * as Models from './';
import { Node } from './node';

@Entity('relationships')
@ObjectType()
export class Relationship extends Node {
  @Field(() => ID)
  @Column()
  public collectionId!: string;

  @Field({ nullable: true })
  @Column({ default: null, nullable: true })
  public description?: string;

  @Field({ nullable: true })
  @Column({ default: null, nullable: true })
  public displayName?: string;

  @Field(() => Models.IdentifierTypeUnion, { nullable: true })
  public subject?: typeof Models.IdentifierTypeUnion;

  @Field(() => Models.InformationTypeEnum)
  @Column()
  public subjectType!: Models.InformationTypeEnum;

  @Field(() => ID)
  @Column()
  public subjectTypeId!: string;

  @Field(() => Models.IdentifierTypeUnion, { nullable: true })
  public target?: typeof Models.IdentifierTypeUnion;

  @Field(() => Models.InformationTypeEnum)
  @Column()
  public targetType!: Models.InformationTypeEnum;

  @Field(() => ID)
  @Column()
  public targetTypeId!: string;
}
