import { Field, ObjectType } from 'type-graphql';
import { Relationship } from '../models';
import { Response } from './response';

@ObjectType()
export class RelationshipResponse extends Response {
  @Field(() => Relationship, { nullable: true })
  public relationship?: Relationship;
}

@ObjectType()
export class RelationshipsResponse extends Response {
  @Field(() => [ Relationship ], { nullable: true })
  public relationships?: Relationship[];
}
