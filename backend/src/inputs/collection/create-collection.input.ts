import { InputType, Field } from 'type-graphql';

import { Collection } from '../../models';

@InputType()
export class CreateCollectionInput implements Partial<Collection> {
  @Field()
  public name!: string;
}
