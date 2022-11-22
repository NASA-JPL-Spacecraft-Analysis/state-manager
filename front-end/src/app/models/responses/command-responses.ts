import { Command, CommandArgument } from '../command';
import { Response } from './response';

export type CommandArgumentResponse = Response & { commandArguments: CommandArgument[] };

export type CommandsResponse = Response & { commands: Command[] };
