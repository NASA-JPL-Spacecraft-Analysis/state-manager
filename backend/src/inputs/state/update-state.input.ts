import { InputType, Field, ID } from 'type-graphql';

import { State } from '../../models';

@InputType()
export class UpdateStateInput implements Partial<State> {
  @Field()
  public dataType!: string;

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public displayName?: string;

  @Field({ nullable: true })
  public externalLink?: string;

  @Field(() => ID)
  public id!: string;

  @Field({ nullable: true })
  public identifier?: string;

  @Field({ nullable: true })
  public source?: string;

  @Field({ nullable: true })
  public subsystem?: string;

  @Field()
  public type!: string;

  @Field({ nullable: true })
  public units?: string;
}
