import { InputType, Field, ID } from 'type-graphql';

import { ModifyStateEnumeration } from './modify-state-enumeration.input';

@InputType()
export class UpdateStateInput {
  @Field({ nullable: true })
  public channelId?: string;

  @Field()
  public dataType!: string;

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public displayName?: string;

  @Field(() => [ ModifyStateEnumeration ], { nullable: true })
  public enumerations?: ModifyStateEnumeration[];

  @Field({ nullable: true })
  public externalLink?: string;

  @Field(() => ID)
  public id!: string;

  @Field()
  public identifier!: string;

  @Field()
  public restricted!: boolean;

  @Field({ nullable: true })
  public source?: string;

  @Field({ nullable: true })
  public subsystem?: string;

  @Field()
  public type!: string;

  @Field({ nullable: true })
  public units?: string;
}
