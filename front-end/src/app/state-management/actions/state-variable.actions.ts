import { createAction, props } from '@ngrx/store';

import { StateVariable } from '../models';

export const createStateVariable = createAction(
  '[state variable] create_state_variable',
  props<{ stateVariable: StateVariable }>()
);

export const createStateVariableFailure = createAction(
  '[state variable] create_state_variable_failure',
  props<{ error: Error }>()
);

export const createStateVariableSuccess = createAction(
  '[state variable] create_state_variable_success',
  props<{ stateVariable: StateVariable }>()
);

export const createStateVariablesSuccess = createAction(
  '[state variable] create_states_variable_success',
  props<{ stateVariables: StateVariable[] }>()
);

export const editStateVariable = createAction(
  '[state variable] edit_state_variable',
  props<{ stateVariable: StateVariable }>()
);

export const editStateVariableFailure = createAction(
  '[state variable] edit_state_variable_failure',
  props<{ error: Error }>()
);

export const editStateVariableSuccess = createAction(
  '[state variable] edit_state_variable_success',
  props<{ stateVariable: StateVariable }>()
);

export const fetchIdentifiers = createAction(
  '[state variable] fetch_identifiers',
  props<{}>()
);

export const fetchIdentifiersFailure = createAction(
  '[state variable] fetch_identifiers_failure',
  props<{ error: Error }>()
);

export const fetchStateVariablesFailure = createAction(
  '[state variable] fetch_state_varaiables_failure',
  props<{ error: Error }>()
);

export const parseStateVariablesFile = createAction(
  '[state variable] parse_state_variables_file',
  props<{ file: File }>()
);

export const parseStateVariablesFileSuccess = createAction(
  '[state variable] parse_state_variables_file_success',
  props<{ parsedStateVariables: Partial<StateVariable>[] }>()
);

export const parseStateVariablesFileFailure = createAction(
  '[state variable] parse_state_variables_file_failure',
  props<{ error: Error }>()
);

export const setIdentifiers = createAction(
  '[state variable] set_identifiers',
  props<{ identifiers: string[] }>()
);

export const setStateVariables = createAction(
  '[state variable] set_state_variables',
  props<{ stateVariables: StateVariable[] }>()
);

export const setSelectedStateVariable = createAction(
  '[state variable] set_selected_state_variable',
  props<{ stateVariable: StateVariable }>()
);

export const uploadStateVariablesFailure = createAction(
  '[state variable] upload_state_variables_file_failure',
  props<{ error: Error }>()
);
