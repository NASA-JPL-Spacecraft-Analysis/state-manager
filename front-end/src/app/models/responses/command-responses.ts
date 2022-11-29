import { Command } from '../command';
import { CommandArgument } from '../command-argument';
import { Response } from './response';

export type CommandArgumentResponse = Response & { commandArguments: CommandArgument[] };

export type CommandsResponse = Response & { commands: Command[] };
