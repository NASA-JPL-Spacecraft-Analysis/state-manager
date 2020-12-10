import { Entity, Column } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

import { Relationship } from './relationship';

@Entity('relationship_history')
@ObjectType()
export class RelationshipHistory extends Relationship {
  @Field(() => ID)
  @Column()
  public relationshipId!: string;

  @Field(() => Date)
  @Column()
  public updated!: Date;
}
