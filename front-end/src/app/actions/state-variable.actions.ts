import { createAction, props } from '@ngrx/store';

import {
  StateVariable,
  StateVariableMap,
  StateEnumerationMap,
  StateEnumeration,
  Relationship,
  RelationshipMap
} from '../models';

export const createStateVariable = createAction(
  '[state variable] createStateVariable',
  props<{ stateVariable: StateVariable, stateEnumerations: StateEnumeration[] }>()
);

export const createRelationship = createAction(
  '[state variable] createRelationship',
  props<{ relationship: Relationship }>()
);

export const createRelationshipFailure = createAction(
  '[state variable] createRelationshipFailure',
  props<{ error: Error }>()
);

export const createRelationshipSuccess = createAction(
  '[state variable] createRelationshipSuccess',
  props<{ relationship: Relationship }>()
);

export const editRelationship = createAction(
  '[state variable] editRelationship',
  props<{ relationship: Relationship }>()
);

export const editRelationshipFailure = createAction(
  '[state variable] editRelationshipFailure',
  props<{ error: Error }>()
);

export const editRelationshipSuccess = createAction(
  '[state variable] editRelationshipSuccess',
  props<{ relationship: Relationship }>()
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

export const fetchRelationshipsFailure = createAction(
  '[state variable] fetchRelationshipsFailure',
  props<{ error: Error }>()
);

export const fetchRelationshipHistoryFailure = createAction(
  '[state variable] fetchRelationshipHistoryFailure',
  props<{ error: Error }>()
);

export const fetchStateEnumerationsFailure = createAction(
  '[state variable] fetchStateEnumerationsFailure',
  props<{ error: Error }>()
);

export const fetchStateHistoryFailure = createAction(
  '[state variable] fetchStateVariableHistoryFailure',
  props<{ error: Error }>()
);

export const fetchStateVariablesFailure = createAction(
  '[state variable] fetchStateVariablesFailure',
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

export const setRelationships = createAction(
  '[state variable] setRelationships',
  props<{ relationships: RelationshipMap }>()
);

export const setRelationshipHistory = createAction(
  '[state variable] setRelationshipHistory',
  props<{ relationshipHistory: RelationshipMap }>()
);

export const setStateEnumerations = createAction(
  '[state variable] setStateEnumerations',
  props<{ stateEnumerations: StateEnumerationMap }>()
);

export const setStateHistory = createAction(
  '[state variable] setStateHistory',
  props<{ stateHistory: StateVariableMap }>()
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

export const uploadStateVariables = createAction(
  '[state variable] uploadStateVariables',
  props<{ file: File }>()
);

export const uploadStateVariablesFailure = createAction(
  '[state variable] uploadStateVariablesFailure',
  props<{ error: Error }>()
);

export const uploadStateVariablesSuccess = createAction(
  '[state variable] uploadStateVariablesSuccess',
  props<{ stateVariables: StateVariableMap }>()
);
