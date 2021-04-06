import { Field, ID, InputType } from 'type-graphql';

import { CreateGroupMappingInput } from './create-group-mapping-input';

@InputType()
export class UpdateGroupInput {
  @Field()
  public name!: string;

  @Field(() => ID)
  public id!: string;

  @Field(() => [ CreateGroupMappingInput ])
  public groupMappings!: CreateGroupMappingInput[];
}
