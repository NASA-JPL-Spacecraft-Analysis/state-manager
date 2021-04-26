import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Response {
  @Field(() => String, { nullable: true })
  message: string | undefined;

  @Field()
  success: boolean;
}
