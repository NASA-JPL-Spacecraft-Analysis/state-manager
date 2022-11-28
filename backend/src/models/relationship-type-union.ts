import { createUnionType } from 'type-graphql';

import { Command } from './command';
import { Constraint } from './constraint';
import { Event } from './event';
import { InformationType } from './information-type';
import { StateEnumeration } from './state-enumeration';
import { State } from './state';
import { CommandArgument } from './command-argument';

export const RelationshipTypeUnion = createUnionType({
  name: 'RelationshipTypeUnion',
  types: () => [Command, CommandArgument, Constraint, Event, InformationType, State, StateEnumeration] as const,
  resolveType: value => {
    if (value instanceof Command) {
      return Command;
    }

    if (value instanceof CommandArgument) {
      return CommandArgument;
    }

    if (value instanceof Constraint) {
      return Constraint;
    }

    if (value instanceof Event) {
      return Event;
    }

    if (value instanceof InformationType) {
      return InformationType;
    }

    if (value instanceof State) {
      return State;
    }

    if (value instanceof StateEnumeration) {
      return StateEnumeration;
    }

    return undefined;
  }
});
