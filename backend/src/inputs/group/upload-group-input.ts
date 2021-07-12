import { Field, InputType } from 'type-graphql';

import { UploadGroupMappingInput } from './upload-group-mapping-input';

@InputType()
export class UploadGroupInput {
  @Field(() => [ UploadGroupMappingInput ])
  public groupMappings!: UploadGroupMappingInput[];

  @Field()
  public name!: string;
}
