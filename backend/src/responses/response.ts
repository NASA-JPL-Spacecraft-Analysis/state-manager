import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Response {
  @Field(() => String)
  public message!: string | unknown;

  @Field()
  public success!: boolean;
}
