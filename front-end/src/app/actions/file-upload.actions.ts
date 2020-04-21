import { createAction, props } from '@ngrx/store';

import { StateVariableMap } from '../models';

export const uploadStateVariablesFailure = createAction(
  '[state variable] uploadStateVariablesCsvFailure',
  props<{ error: Error }>()
);

export const uploadStateVariablesSuccess = createAction(
  '[state variable] uploadStateVariablesCsvSuccess',
  props<{ stateVariableMap: StateVariableMap }>()
);

export const uploadStateVariables = createAction(
  '[state variable] uploadStateVariablesCsv',
  props<{ file: File, fileType: string }>()
);
