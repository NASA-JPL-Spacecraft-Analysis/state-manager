import { Field, ID, InputType } from 'type-graphql';

import { UploadGroupMappingInput } from './upload-group-mapping-input';

@InputType()
export class UploadGroupMappingsInput {
  @Field(() => ID)
  public collectionId!: string;

  @Field(() => [ UploadGroupMappingInput ])
  public groupMappings!: UploadGroupMappingInput[];
}
