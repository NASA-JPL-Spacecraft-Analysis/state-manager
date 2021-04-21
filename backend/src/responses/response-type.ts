import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ResponseType {
  @Field()
  success: boolean;

  @Field(() => String, { nullable: true })
  message: string | undefined;
}
