import { Field, ID, InputType } from 'type-graphql';

import { GroupItemType, GroupMapping, GroupMappingItemUnion } from '../../models';

@InputType()
export class CreateGroupMappingInput implements Partial<GroupMapping> {
  @Field(() => ID)
  public groupId!: string;

  @Field(() => GroupMappingItemUnion, { nullable: true })
  public item?: GroupItemType;

  @Field(() => ID)
  public itemId!: string;
}
