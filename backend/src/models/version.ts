import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Version {
    @Field()
    public version!: string;
}
