import { createAction, props } from '@ngrx/store';

import { Command, CommandHistory } from '../models';

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

export const fetchCommandHistoryFailure = createAction(
  '[command] fetchCommandHistoryFailure',
  props<{ error: Error }>()
);

export const fetchCommandsFailure = createAction(
  '[command] fetchCommandsFailure',
  props<{ error: Error }>()
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
