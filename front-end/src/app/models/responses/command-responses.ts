import { Command, CommandArgument } from '../command';
import { Response } from './response';

export type DeleteArgumentResponse = Response & { deletedArgumentIds: string[] };

export type CommandArgumentResponse = Response & { commandArguments: CommandArgument[] };

export type CommandResponse = Response & { command: Command };

export type CommandsResponse = Response & { commands: Command[] };
