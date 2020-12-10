import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StateState } from '../reducers/state.reducer';

const getStatesState = createFeatureSelector<StateState>('states');

export const getStateIdentifierMap = createSelector(
  getStatesState,
  (stateState: StateState) => stateState.stateIdentifierMap
);

export const getStateEnumerations = createSelector(
  getStatesState,
  (stateState: StateState) => stateState.stateEnumerationMap
);

export const getStateHistory = createSelector(
  getStatesState,
  (stateState: StateState) => stateState.stateHistoryMap
);

export const getSelectedState = createSelector(
  getStatesState,
  (stateState: StateState) => stateState.selectedState
);

export const getStates = createSelector(
  getStatesState,
  (stateState: StateState) => stateState.stateMap
);
