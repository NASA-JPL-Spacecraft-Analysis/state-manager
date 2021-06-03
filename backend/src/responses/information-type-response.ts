import { Field, ObjectType } from 'type-graphql';

import { InformationType } from '../models';
import { Response } from './response';

@ObjectType()
export class InformationTypeResponse extends Response {
  @Field(() => [ InformationType ], { nullable: true })
  public informationTypes?: InformationType[];
}
