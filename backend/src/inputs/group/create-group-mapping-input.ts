import { Field, ID, InputType } from 'type-graphql';

import { GroupMapping } from '../../models';

@InputType()
export class CreateGroupMappingInput implements Partial<GroupMapping> {
  @Field(() => ID, { nullable: true })
  public groupId?: string;

  @Field(() => ID)
  public itemId!: string;

  @Field({ nullable: true })
  public sortOrder?: number;
}
