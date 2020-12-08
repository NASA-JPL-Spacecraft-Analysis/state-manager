import { Field, InputType } from 'type-graphql';

import { UploadRelationshipInput } from './upload-relationship.input';

@InputType()
export class CreateRelationshipsInput {
  @Field()
  public collectionId!: string;

  @Field(() => [ UploadRelationshipInput ])
  public relationships!: UploadRelationshipInput[];
}
