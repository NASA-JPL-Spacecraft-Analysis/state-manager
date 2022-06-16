import { Command, CommandArgument, Constraint, Event, InformationType, State, StateEnumeration } from './';

export type AutoCompleteType =
  Command | CommandArgument | Constraint | Event | InformationType | State | StateEnumeration;

export type AutoCompleteListType = AutoCompleteType[];
