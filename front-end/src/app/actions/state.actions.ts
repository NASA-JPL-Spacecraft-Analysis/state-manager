import { createAction, props } from '@ngrx/store';

import {
  State,
  StateMap,
  StateEnumeration,
  StateEnumerationMap
} from '../models';

export const createState = createAction(
  '[state] createState',
  props<{ collectionId: number, state: State, stateEnumerations: StateEnumeration[] }>()
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

export const setSelectedState = createAction(
  '[state] setSelectedState',
  props<{ state: State }>()
);
