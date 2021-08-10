import { Field, ID, InputType } from 'type-graphql';

import { StateEnumeration } from '../../models';

@InputType()
export class ModifyStateEnumeration implements Partial<StateEnumeration> {
  @Field(() => ID, { nullable: true })
  public id?: string;

  @Field()
  public label!: string;

  @Field(() => ID, { nullable: true })
  public stateId?: string;

  @Field()
  public value!: string;
}
