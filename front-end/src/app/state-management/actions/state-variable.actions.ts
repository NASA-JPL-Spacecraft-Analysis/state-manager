import { createAction, props } from '@ngrx/store';

import { StateVariable } from '../models';

export const modifyStateVariable = createAction(
  '[state variable] modify_state_variable',
  props<{ stateVariable: StateVariable }>()
);

export const createStateVariableFailure = createAction(
  '[state variable] create_state_variable_failure',
  props<{ error: Error }>()
);

export const createStateVariableSuccess = createAction(
  '[state variable] create_state_variable_success',
  props<{ stateVariables: StateVariable[] }>()
);

export const fetchStateVariablesFailure = createAction(
  '[state variable] fetch_state_varaiables_failure',
  props<{ error: Error }>()
);

export const setStateVariables = createAction(
  '[state varaiable] set_state_variables',
  props<{ stateVariables: StateVariable[] }>()
);
