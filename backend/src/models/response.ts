import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Response {
  @Field(() => String)
  public message?: string;

  @Field(() => Boolean)
  public success?: boolean;
}
