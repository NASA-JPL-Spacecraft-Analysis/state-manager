import { InputType, Field, ID } from 'type-graphql';

import { State } from '../../models';

@InputType()
export class CreateStateInput implements Partial<State> {
  @Field(() => ID, { nullable: true })
  public collectionId: string;

  @Field()
  public dataType!: string;

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public displayName?: string;

  @Field({ nullable: true })
  public externalLink?: string;

  @Field()
  public identifier!: string;

  @Field({ nullable: true })
  public source?: string;

  @Field({ nullable: true })
  public subsystem?: string;

  @Field()
  public type!: string;

  @Field({ nullable: true })
  public units?: string;
}
