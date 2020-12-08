import { InputType, Field, ID } from 'type-graphql';

import { State } from '../../models';

@InputType()
export class CreateStateInput implements Partial<State> {
  @Field(() => ID, { nullable: true })
  public collectionId: string;

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public displayName?: string;

  @Field()
  public identifier!: string;

  @Field({ nullable: true })
  public source?: string;

  @Field({ nullable: true })
  public subsystem?: string;

  @Field({ nullable: true })
  public type?: string;

  @Field({ nullable: true })
  public units?: string;
}
