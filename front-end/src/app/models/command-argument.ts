import { CommandArgumentEnumeration } from '.';
import { Node } from './node';

export enum CommandArgumentType {
  Enumerated = 'Enumerated',
  Numeric = 'Numeric',
  String = 'String'
}

export interface CommandArgument extends Node {
  collectionId: string;
  commandId: string;
  description: string;
  enumerations: CommandArgumentEnumeration[];
  name: string;
  sortOrder: number;
  type: CommandArgumentType;
}

export interface CommandArgumentHistory extends CommandArgument {
  commandArgumentId: string;
  updated: Date;
}

export type CommandArgumentMap = Record<string, CommandArgument[]>;
