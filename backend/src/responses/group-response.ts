import { Field, ObjectType } from 'type-graphql';

import { Group } from '../models';
import { Response } from './response';

@ObjectType()
export class GroupsResponse extends Response {
  @Field(() => [ Group ], { nullable: true })
  public groups?: Group[];
}
