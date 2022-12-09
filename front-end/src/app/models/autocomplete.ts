import {
  Command,
  CommandArgument,
  CommandArgumentEnumeration,
  Constraint,
  Event,
  Group,
  InformationType,
  State,
  StateEnumeration
} from './';

export type AutoCompleteType =
  | Command
  | CommandArgument
  | CommandArgumentEnumeration
  | Constraint
  | Event
  | Group
  | InformationType
  | State
  | StateEnumeration;

export type AutoCompleteSetType = Set<AutoCompleteType>;
