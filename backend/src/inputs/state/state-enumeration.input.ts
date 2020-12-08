import { Field, ID, InputType } from 'type-graphql';

import { StateEnumeration } from '../../models';

/**
 * We don't extend node here because InputTypes don't inherit properties from interfaces.
 */
@InputType('StateEnumerationInput')
export class StateEnumerationInput implements Partial<StateEnumeration> {
  @Field(() => ID, { nullable: true })
  public collectionId: string;

  @Field()
  public label: string;

  @Field(() => ID, { nullable: true })
  public id?: string;

  @Field(() => ID, { nullable: true })
  public stateId: string;

  @Field({ nullable: true })
  public stateIdentifier: string;

  @Field()
  public value: string;
}
