import { Field, ID, InputType } from 'type-graphql';

import { CreateGroupMappingInput } from './create-group-mapping-input';

@InputType()
export class CreateGroupInput {
  @Field(() => ID)
  public collectionId!: string;

  @Field()
  public name!: string;

  @Field(() => [ CreateGroupMappingInput ])
  public groupMappings!: CreateGroupMappingInput[];
}
