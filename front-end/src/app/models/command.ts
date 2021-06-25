import { IdentifierType } from './identifier-type';
import { StringTMap } from './string-t-map';

export interface Command extends IdentifierType {}

export interface CommandArgument {
  name: string;
  sortOrder: number;
}

export interface CommandHistory extends Command {
  commandId: string;
  updated: Date;
}

export type CommandMap = StringTMap<Command>;

export const commandTypes: string[] = [
  'command'
];
