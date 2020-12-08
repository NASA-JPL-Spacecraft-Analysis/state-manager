import { createAction, props } from '@ngrx/store';

import {
  State,
  StateEnumeration,
  StateHistory
} from '../models';

export const createState = createAction(
  '[state] createState',
  props<{ collectionId: string; state: State }>()
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
  props<{ states: State[] }>()
);

export const deleteEnumerations = createAction(
  '[state] deleteEnumerations',
  props<{ deletedEnumerationIds: string[]; stateId: string }>()
);

export const deleteEnumerationsFailure = createAction(
  '[state] deleteEnumerationsFailure',
  props<{ error: Error }>()
);

export const deleteEnumerationsSuccess = createAction(
  '[state] deleteEnumerationsSuccess',
  props<{ deletedEnumerationIds: string[] }>()
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
  props<{ collectionId: string; stateId: string; enumerations: StateEnumeration[] }>()
);

export const saveEnumerationsSuccess = createAction(
  '[state] saveEnumerationsSuccess',
  props<{ enumerations: StateEnumeration[]; stateId: string }>()
);

export const saveEnumerationsFailure = createAction(
  '[state] saveEnumerationsFailure',
  props<{ error: Error }>()
);

export const setStateEnumerations = createAction(
  '[state] setStateEnumerations',
  props<{ stateEnumerations: StateEnumeration[] }>()
);

export const setStateHistory = createAction(
  '[state] setStateHistory',
  props<{ stateHistory: StateHistory[] }>()
);

export const setStates = createAction(
  '[state] setStates',
  props<{ states: State[] }>()
);

export const setSelectedState = createAction(
  '[state] setSelectedState',
  props<{ state: State }>()
);

export const updateState = createAction(
  '[state] updateState',
  props<{ updatedState: State }>()
);

export const updateStateFailure = createAction(
  '[state] updateStateFailure',
  props<{ error: Error }>()
);

export const updateStateSuccess = createAction(
  '[state] updateStateSuccess',
  props<{ state: State }>()
);
