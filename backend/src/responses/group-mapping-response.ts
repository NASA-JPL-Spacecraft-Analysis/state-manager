import { Field, ObjectType } from 'type-graphql';

import { GroupMapping } from '../models';
import { Response } from './response';

@ObjectType()
export class GroupMappingResponse extends Response {
  @Field(() => [ GroupMapping ], { nullable: true })
  public groupMappings?: GroupMapping[];
}
