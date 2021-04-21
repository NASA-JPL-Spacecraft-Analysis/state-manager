import { Field, ObjectType } from 'type-graphql';

import { Group } from '../../models';
import { ResponseType } from '../response-type';

@ObjectType()
export class GroupsResponse extends ResponseType {
  @Field(() => [ Group ], { nullable: true })
  groups?: Group[];
}
