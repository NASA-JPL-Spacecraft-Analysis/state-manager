import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StateState } from '../reducers/state.reducer';

const getStatesState = createFeatureSelector<StateState>('states');

export const getStateIdentifierMap = createSelector(
  getStatesState,
  (stateState: StateState) => stateState.stateIdentifierMap
);

export const getStateEnumerations = createSelector(
  getStatesState,
  (stateState: StateState) => 
    stateState.selectedStateId ? stateState.stateEnumerationMap[stateState.selectedStateId]: []
);

export const getStateHistory = createSelector(
  getStatesState,
  (stateState: StateState) => stateState.stateHistoryMap
);

export const getSelectedState = createSelector(
  getStatesState,
  (state: StateState) => 
    state.selectedStateId ? state.stateMap[state.selectedStateId] : undefined
);

export const getStates = createSelector(
  getStatesState,
  (stateState: StateState) => stateState.stateMap
);
