import { CommandArgument } from './command-argument';
import { IdentifierType } from './identifier-type';
import { StringTMap } from './string-t-map';

export interface Command extends IdentifierType {
  arguments: CommandArgument[];
}

export interface CommandArgumentUpload {
  commandIdentifier: string;
  name: string;
  sortOrder: number;
}

export interface CommandHistory extends Command {
  commandId: string;
  updated: Date;
}

export type CommandMap = StringTMap<Command>;
