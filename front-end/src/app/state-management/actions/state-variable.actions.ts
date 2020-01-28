import { createAction, props } from '@ngrx/store';

import { StateVariable, StateVariableMap, StateEnumerationMap, StateEnumeration } from '../models';

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

export const fetchStateEnumerationsFailure = createAction(
  '[state variable] fetch_state_enuemerations_failure',
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

export const saveEnumerations = createAction(
  '[state variable] save_enumerations',
  props<{ enumerations: StateEnumeration[] }>()
);

export const saveEnumerationsSuccess = createAction(
  '[state variable] save_enumerations_success',
  props<{ enumerations: StateEnumeration[] }>()
);

export const saveEnumerationsFailure = createAction(
  '[state variable] save_enumerations_failure',
  props<{ error: Error }>()
);

export const setIdentifiers = createAction(
  '[state variable] set_identifiers',
  props<{ identifiers: string[] }>()
);

export const setStateEnumerations = createAction(
  '[state variable] set_state_enumerations',
  props<{ stateEnumerations: StateEnumerationMap }>()
);

export const setStateVariables = createAction(
  '[state variable] set_state_variables',
  props<{ stateVariables: StateVariableMap }>()
);

export const setSelectedStateVariable = createAction(
  '[state variable] set_selected_state_variable',
  props<{ stateVariable: StateVariable }>()
);

export const uploadStateVariablesFailure = createAction(
  '[state variable] upload_state_variables_file_failure',
  props<{ error: Error }>()
);
