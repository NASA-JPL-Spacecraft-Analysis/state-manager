import { createAction, props } from '@ngrx/store';

import {
  Relationship,
  RelationshipMap,
  State,
  StateMap,
  StateEnumeration,
  StateEnumerationMap
} from '../models';

export const createState = createAction(
  '[state] createState',
  props<{ collectionId: number, state: State, stateEnumerations: StateEnumeration[] }>()
);

export const createRelationship = createAction(
  '[state] createRelationship',
  props<{ relationship: Relationship }>()
);

export const createRelationshipFailure = createAction(
  '[state] createRelationshipFailure',
  props<{ error: Error }>()
);

export const createRelationshipSuccess = createAction(
  '[state] createRelationshipSuccess',
  props<{ relationship: Relationship }>()
);

export const editRelationship = createAction(
  '[state] editRelationship',
  props<{ relationship: Relationship }>()
);

export const editRelationshipFailure = createAction(
  '[state] editRelationshipFailure',
  props<{ error: Error }>()
);

export const editRelationshipSuccess = createAction(
  '[state] editRelationshipSuccess',
  props<{ relationship: Relationship }>()
);

export const createStateFailure = createAction(
  '[state] createStateFailure',
  props<{ error: Error }>()
);

export const createStateSuccess = createAction(
  '[state] createStateSuccess',
  props<{ state: State }>()
);

export const createStatesSuccess = createAction(
  '[state] createStatesSuccess',
  props<{ stateMap: StateMap }>()
);

export const editState = createAction(
  '[state] editState',
  props<{ collectionId: number, state: State }>()
);

export const editStateFailure = createAction(
  '[state] editStateFailure',
  props<{ error: Error }>()
);

export const editStateSuccess = createAction(
  '[state] editStateSuccess',
  props<{ state: State }>()
);

export const fetchIdentifiersFailure = createAction(
  '[state] fetchIdentifiersFailure',
  props<{ error: Error }>()
);

export const fetchRelationshipsFailure = createAction(
  '[state] fetchRelationshipsFailure',
  props<{ error: Error }>()
);

export const fetchRelationshipHistoryFailure = createAction(
  '[state] fetchRelationshipHistoryFailure',
  props<{ error: Error }>()
);

export const fetchStateEnumerationsFailure = createAction(
  '[state] fetchStateEnumerationsFailure',
  props<{ error: Error }>()
);

export const fetchStateHistoryFailure = createAction(
  '[state] fetchStateHistoryFailure',
  props<{ error: Error }>()
);

export const fetchStatesFailure = createAction(
  '[state] fetchStatesFailure',
  props<{ error: Error }>()
);

export const saveEnumerations = createAction(
  '[state] saveEnumerations',
  props<{ collectionId: number, stateId: number, enumerations: StateEnumeration[] }>()
);

export const saveEnumerationsSuccess = createAction(
  '[state] saveEnumerationsSuccess',
  props<{ enumerations: StateEnumeration[] }>()
);

export const saveEnumerationsFailure = createAction(
  '[state] saveEnumerationsFailure',
  props<{ error: Error }>()
);

export const setStateIdentifiers = createAction(
  '[state] setStateIdentifiers',
  props<{ stateIdentifiers: string[] }>()
);

export const setRelationships = createAction(
  '[state] setRelationships',
  props<{ relationships: RelationshipMap }>()
);

export const setRelationshipHistory = createAction(
  '[state] setRelationshipHistory',
  props<{ relationshipHistory: RelationshipMap }>()
);

export const setStateEnumerations = createAction(
  '[state] setStateEnumerations',
  props<{ stateEnumerationMap: StateEnumerationMap }>()
);

export const setStateHistory = createAction(
  '[state] setStateHistory',
  props<{ stateHistoryMap: StateMap }>()
);

export const setStates = createAction(
  '[state] setStates',
  props<{ stateMap: StateMap }>()
);

export const setSelectedRelationship = createAction(
  '[state] setSelectedRelationship',
  props<{ relationship: Relationship }>()
);

export const setSelectedState = createAction(
  '[state] setSelectedState',
  props<{ state: State }>()
);
