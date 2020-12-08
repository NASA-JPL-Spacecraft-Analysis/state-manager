import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { IdentifierType } from './identifier-type';
import { StateEnumeration } from './state-enumeration';

@Entity('states')
@ObjectType()
export class State extends IdentifierType {
  @Field({ nullable: true })
  @Column({ default: null, nullable: true })
  public description?: string;

  @Field({ nullable: true })
  @Column({ default: null, nullable: true })
  public source?: string;

  @Field(() => [ StateEnumeration ])
  public enumerations!: StateEnumeration[];

  @Field({ nullable: true })
  @Column({ default: null, nullable: true })
  public subsystem?: string;

  @Field({ nullable: true })
  @Column({ default: null, nullable: true })
  public type?: string;

  @Field({ nullable: true })
  @Column({ default: null, nullable: true })
  public units?: string;
}
