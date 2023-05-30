import { createAction, props } from '@ngrx/store';

import { Command, CommandArgument, CommandArgumentHistory, CommandHistory } from '../models';

export const clearCommands = createAction('[command] clearCommands');

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

export const fetchCommandTypesFailure = createAction(
  '[command] fetchCommandTypesFailure',
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

export const setCommands = createAction('[command] setCommands', props<{ commands: Command[] }>());

export const setCommandTypes = createAction(
  '[command] setCommandTypes',
  props<{ commandTypes: string[] }>()
);

export const setSelectedCommand = createAction(
  '[command] setSelectedCommand',
  props<{ id: string }>()
);
