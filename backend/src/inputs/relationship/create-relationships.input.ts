import { Field, InputType, ID } from 'type-graphql';

import { UploadRelationshipInput } from './upload-relationship.input';

@InputType()
export class CreateRelationshipsInput {
  @Field(() => ID)
  public collectionId!: string;

  @Field(() => [ UploadRelationshipInput ])
  public relationships!: UploadRelationshipInput[];
}
