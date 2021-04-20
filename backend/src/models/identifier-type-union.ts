import { createUnionType } from 'type-graphql';

import { Event } from './event';
import { InformationType } from './information-type';
import { State } from './state';

export const IdentifierTypeUnion = createUnionType({
  name: 'IdentifierTypeUnion',
  types: () => [ Event, InformationType, State ] as const,
  resolveType: value => {
    if (value instanceof Event) {
      return Event;
    }

    if (value instanceof InformationType) {
      return InformationType;
    }

    if (value instanceof State) {
      return State;
    }

    return undefined;
  }
});
