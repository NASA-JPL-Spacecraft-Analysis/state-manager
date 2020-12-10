import { InputType, Field, ID } from 'type-graphql';

import { Collection } from '../../models';

@InputType()
export class UpdateCollectionInput implements Partial<Collection> {
  @Field(() => ID)
  public id!: string;

  @Field()
  public name!: string;
}
