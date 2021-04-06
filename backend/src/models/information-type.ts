import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { IdentifierType } from './identifier-type';
import { InformationTypeEnum } from './information-type.enum';

@Entity('information_types')
@ObjectType()
export class InformationType extends IdentifierType {
  @Field(() => String, { nullable: true })
  @Column({ default: null, nullable: true })
  public description: string;

  @Field(() => String, { nullable: true })
  @Column({ default: null, nullable: true })
  public externalLink: string;

  @Field(() => InformationTypeEnum)
  @Column()
  public type!: InformationTypeEnum;
}
