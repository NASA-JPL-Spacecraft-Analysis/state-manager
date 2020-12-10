
import { Entity, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { InformationTypeEnum } from './information-type.enum';
import { IdentifierType } from './identifier-type';
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

  @Field(() => IdentifierType, { nullable: true })
  public subject?: IdentifierType;

  @Field(() => InformationTypeEnum)
  @Column()
  public subjectType!: InformationTypeEnum;

  @Field(() => ID)
  @Column()
  public subjectTypeId!: string;

  @Field(() => IdentifierType, { nullable: true })
  public target?: IdentifierType;

  @Field(() => InformationTypeEnum)
  @Column()
  public targetType!: InformationTypeEnum;

  @Field(() => ID)
  @Column()
  public targetTypeId!: string;
}
