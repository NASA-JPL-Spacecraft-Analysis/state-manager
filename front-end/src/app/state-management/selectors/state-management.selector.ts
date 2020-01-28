import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from '../state-management-app-store';
import { StateManagementState } from '../reducers/state-management.reducer';
import { StateEnumeration, StateEnumerationMap } from '../models';

const featureSelector = createFeatureSelector<State>('stateManagementApp');

export const getStateManagementState = createSelector(
  featureSelector,
  (state: State): StateManagementState => state.data
);

export const getStateEnumerationsForSelectedStateVariable = createSelector(
  getStateManagementState,
  (state: StateManagementState): StateEnumeration[] => {
    const stateEnumerations: StateEnumeration[] = [];

    // Only populate our enumeration list if a state variable is selected, and it has enumerations.
    if (state.selectedStateVariable &&
        (state.selectedStateVariable.enumerationIds && state.selectedStateVariable.enumerationIds.length > 0)) {
      for (const id of state.selectedStateVariable.enumerationIds) {
        stateEnumerations.push(state.stateEnumerations[id]);
      }
    }

    return stateEnumerations;
  }
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
