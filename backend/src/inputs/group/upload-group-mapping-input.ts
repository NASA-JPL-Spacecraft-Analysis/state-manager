import { Field, InputType } from 'type-graphql';

@InputType()
export class UploadGroupMappingInput {
  @Field()
  public itemIdentifier!: string;

  @Field()
  public itemType!: string;

  @Field()
  public name!: string;
}
