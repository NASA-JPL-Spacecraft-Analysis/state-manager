import { IdentifierType } from './identifier-type';
import { StringTMap } from './string-t-map';

export interface Command extends IdentifierType {}

export interface CommandHistory extends Command {
  commandId: string;
  update: Date;
}

export type CommandMap = StringTMap<Command>;

export const commandTypes: string[] = [
  'command'
];
