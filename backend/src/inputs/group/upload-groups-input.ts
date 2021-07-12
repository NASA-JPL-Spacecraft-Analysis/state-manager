import { Field, ID, InputType } from 'type-graphql';

import { UploadGroupInput } from './upload-group-input';

@InputType()
export class UploadGroupsInput {
  @Field(() => ID)
  public collectionId!: string;

  @Field(() => [ UploadGroupInput ])
  public groups!: UploadGroupInput[];
}
