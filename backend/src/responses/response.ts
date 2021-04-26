import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Response {
  @Field()
  public message!: string;

  @Field()
  public success!: boolean;
}
