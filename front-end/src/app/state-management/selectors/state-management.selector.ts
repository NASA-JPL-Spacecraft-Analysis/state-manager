import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from '../state-management-app-store';
import { StateManagementState } from '../reducers/state-management.reducer';

const featureSelector = createFeatureSelector<State>('stateManagementApp');

export const getStateManagementState = createSelector(
  featureSelector,
  (state: State): StateManagementState => state.data
);

export const getStateVariables = createSelector(
  getStateManagementState,
  (state: StateManagementState) => state.stateVariables
);

export const getSelectedStateVariable = createSelector(
  getStateManagementState,
  (state: StateManagementState) => state.selectedStateVariable
);

export const getIdentifiers = createSelector(
  getStateManagementState,
  (state: StateManagementState) => state.identifiers
);
