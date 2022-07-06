import { Command, CommandArgument, Constraint, Event, Group, InformationType, State, StateEnumeration } from './';

export type AutoCompleteType =
  Command | CommandArgument | Constraint | Event | Group | InformationType | State | StateEnumeration;

export type AutoCompleteSetType = Set<AutoCompleteType>;
