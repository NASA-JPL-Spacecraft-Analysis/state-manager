import { createUnionType } from 'type-graphql';

import { Constraint, constraintTypes } from './constraint';
import { Event, eventTypes } from './event';
import { InformationType, informationTypes } from './information-type';
import { State, stateTypes } from './state';

export const IdentifierTypeUnion = createUnionType({
  name: 'IdentifierTypeUnion',
  types: () => [ Constraint, Event, InformationType, State ] as const,
  resolveType: value => {
    if (constraintTypes.has(value.type)) {
      return Constraint;
    }

    if (eventTypes.has(value.type)) {
      return Event;
    }

    if (informationTypes.has(value.type)) {
      return InformationType;
    }

    if (stateTypes.has(value.type)) {
      return State;
    }

    return undefined;
  }
});
