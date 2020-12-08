import { Field, ID, InputType } from 'type-graphql';

import { CreateInformationTypeInput } from './create-information-type.input';

@InputType()
export class CreateInformationTypesInput {
  @Field(() => ID)
  public collectionId!: string;

  @Field(() => [ CreateInformationTypeInput ])
  public informationTypes!: CreateInformationTypeInput[];
}
