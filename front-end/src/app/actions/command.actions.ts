import { createAction, props } from '@ngrx/store';

import { Command, CommandArgument, CommandArgumentHistory, CommandHistory } from '../models';

export const createCommand = createAction(
  '[command] createCommand',
  props<{ command: Command }>()
);

export const createCommandFailure = createAction(
  '[command] createCommandFailure',
  props<{ error: Error }>()
);

export const createCommandSuccess = createAction(
  '[command] createCommandSuccess',
  props<{ command: Command }>()
);

export const deleteArguments = createAction(
  '[command] deleteArguments',
  props<{ commandId: string, deletedArgumentIds: string[] }>()
);

export const deleteArgumentsFailure = createAction(
  '[command] deleteArgumentsFailure',
  props<{ error: Error }>()
);

export const deleteArgumentsSuccess = createAction(
  '[command] deleteArgumentsSuccess',
  props<{ deletedArgumentIds: string[] }>()
);

export const fetchCommandArgumentHistoryFailure = createAction(
  '[command] fetchCommandArgumentHistoryFailure',
  props<{ error: Error }>()
);

export const fetchCommandHistoryFailure = createAction(
  '[command] fetchCommandHistoryFailure',
  props<{ error: Error }>()
);

export const fetchCommandsFailure = createAction(
  '[command] fetchCommandsFailure',
  props<{ error: Error }>()
);

export const saveCommandArgumentsSuccess = createAction(
  '[command] saveCommandArgumentsSuccess',
  props<{ commandArguments: CommandArgument[] }>()
);

export const setCommandArgumentHistory = createAction(
  '[command] setCommandArgumentHistory',
  props<{ commandArgumentHistory: CommandArgumentHistory[] }>()
);

export const setCommandHistory = createAction(
  '[command] setCommandHistory',
  props<{ commandHistory: CommandHistory[] }>()
);

export const setCommands = createAction(
  '[command] setCommands',
  props<{ commands: Command[] }>()
);

export const setSelectedCommand = createAction(
  '[command] setSelectedCommand',
  props<{ id: string }>()
);

export const updateCommand = createAction(
  '[command] updateCommand',
  props<{ command: Command }>()
);

export const updateCommandFailure = createAction(
  '[command] updateCommandFailure',
  props<{ error: Error }>()
);

export const updateCommandSuccess = createAction(
  '[command] updateCommandSuccess',
  props<{ command: Command }>()
);
