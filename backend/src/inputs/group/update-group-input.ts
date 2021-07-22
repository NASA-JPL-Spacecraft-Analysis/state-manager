import { Field, ID, InputType } from 'type-graphql';

import { CreateGroupMappingInput } from './create-group-mapping-input';

@InputType()
export class UpdateGroupInput {
  @Field(() => ID)
  public collectionId!: string;

  @Field(() => [ CreateGroupMappingInput ])
  public groupMappings!: CreateGroupMappingInput[];

  @Field(() => ID)
  public id!: string;

  @Field()
  public identifier!: string;
}
