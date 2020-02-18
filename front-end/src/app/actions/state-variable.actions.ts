import { createAction, props } from '@ngrx/store';

import { StateVariable, StateVariableMap, StateEnumerationMap, StateEnumeration, Relationship } from '../models';

export const createStateVariable = createAction(
  '[state variable] createStateVariable',
  props<{ stateVariable: StateVariable, stateEnumerations: StateEnumeration[] }>()
);

export const createStateVariableFailure = createAction(
  '[state variable] createStateVariableFailure',
  props<{ error: Error }>()
);

export const createStateVariableSuccess = createAction(
  '[state variable] createStateVariableSuccess',
  props<{ stateVariable: StateVariable }>()
);

export const createStateVariablesSuccess = createAction(
  '[state variable] createStateVariablesSuccess',
  props<{ stateVariables: StateVariableMap }>()
);

export const editStateVariable = createAction(
  '[state variable] editStateVariable',
  props<{ stateVariable: StateVariable }>()
);

export const editStateVariableFailure = createAction(
  '[state variable] editStateVariableFailure',
  props<{ error: Error }>()
);

export const editStateVariableSuccess = createAction(
  '[state variable] editStateVariableSuccess',
  props<{ stateVariable: StateVariable }>()
);

export const fetchIdentifiersFailure = createAction(
  '[state variable] fetchIdentifiersFailure',
  props<{ error: Error }>()
);

export const fetchStateEnumerationsFailure = createAction(
  '[state variable] fetchStateEnumerationsFailure',
  props<{ error: Error }>()
);

export const fetchStateVariablesFailure = createAction(
  '[state variable] fetchStateVariablesFailure',
  props<{ error: Error }>()
);

export const parseStateVariablesFile = createAction(
  '[state variable] parseStateVariablesFile',
  props<{ file: File }>()
);

export const parseStateVariablesFileSuccess = createAction(
  '[state variable] parseStateVariablesFileSuccess',
  props<{ parsedStateVariables: Partial<StateVariable>[] }>()
);

export const parseStateVariablesFileFailure = createAction(
  '[state variable] parseStateVariablesFileFailure',
  props<{ error: Error }>()
);

export const saveEnumerations = createAction(
  '[state variable] saveEnumerations',
  props<{ stateVariableId: number, enumerations: StateEnumeration[] }>()
);

export const saveEnumerationsSuccess = createAction(
  '[state variable] saveEnumerationsSuccess',
  props<{ enumerations: StateEnumeration[] }>()
);

export const saveEnumerationsFailure = createAction(
  '[state variable] saveEnumerationsFailure',
  props<{ error: Error }>()
);

export const setIdentifiers = createAction(
  '[state variable] setIdentifiers',
  props<{ identifiers: string[] }>()
);

export const setStateEnumerations = createAction(
  '[state variable] setStateEnumerations',
  props<{ stateEnumerations: StateEnumerationMap }>()
);

export const setStateVariables = createAction(
  '[state variable] setStateVariables',
  props<{ stateVariables: StateVariableMap }>()
);

export const setSelectedRelationship = createAction(
  '[state variable] setSelectedRelationship',
  props<{ relationship: Relationship }>()
);

export const setSelectedStateVariable = createAction(
  '[state variable] setSelectedStateVariable',
  props<{ stateVariable: StateVariable }>()
);

export const uploadStateVariablesFailure = createAction(
  '[state variable] uploadStateVariablesFailure',
  props<{ error: Error }>()
);
