import { createAction, props } from '@ngrx/store';

import { StateVariableMap } from '../models';

export const uploadStateVariablesFailure = createAction(
  '[state variable] uploadStateVariablesFailure',
  props<{ error: Error }>()
);

export const uploadStateVariablesSuccess = createAction(
  '[state variable] uploadStateVariablesSuccess',
  props<{ stateVariableMap: StateVariableMap }>()
);

export const uploadStateVariables = createAction(
  '[state variable] uploadStateVariables',
  props<{ file: File, fileType: string }>()
);
