import { InputType, Field, ID } from 'type-graphql';

import { Event } from '../../models';

@InputType()
export class CreateEventInput implements Partial<Event> {
  @Field(() => ID, { nullable: true })
  public collectionId!: string;

  @Field({ nullable: true })
  public description?: string;

  @Field({ nullable: true })
  public displayName?: string;

  @Field({ nullable: true })
  public editable?: boolean;

  @Field({ nullable: true })
  public externalLink?: string;

  @Field()
  public identifier!: string;

  @Field()
  public type!: string;

  @Field({ nullable: true })
  public version?: string;
}
