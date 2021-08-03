import { IdentifierType } from './identifier-type';
import { Node } from './node';
import { StringTMap } from './string-t-map';

export interface Command extends IdentifierType {
  arguments: CommandArgument[];
}

export interface CommandArgument extends Node {
  collectionId: string;
  commandId: string;
  name: string;
  sortOrder: number;
}

export interface CommandArgumentHistory extends CommandArgument {
  commandArgumentId: string;
  updated: Date;
}

export type CommandArgumentMap = StringTMap<CommandArgument[]>;

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
