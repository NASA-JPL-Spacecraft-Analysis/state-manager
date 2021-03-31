import { Field, ID, InputType } from 'type-graphql';

import { Group, GroupMapping } from '../../models';

@InputType()
export class CreateGroupInput implements Partial<Group> {
  @Field(() => ID)
  public collectionId!: string;

  @Field()
  public name!: string;

  @Field(() => [ GroupMapping ])
  public groupMappings!: GroupMapping[];
}
