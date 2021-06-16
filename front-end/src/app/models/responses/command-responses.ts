import { Command } from '../command';
import { Response } from './response';

export type CommandResponse = Response & { command: Command };

export type CommandsResponse = Response & { commands: Command[] };
