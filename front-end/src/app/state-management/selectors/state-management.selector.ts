import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from '../state-management-app-store';
import { StateManagementState } from '../reducers/state-management.reducer';
import { StateEnumeration, StateEnumerationMap, StateVariable } from '../models';

const featureSelector = createFeatureSelector<State>('stateManagementApp');

export const getStateManagementState = createSelector(
  featureSelector,
  (state: State): StateManagementState => state.data
);

export const getStateEnumerations = createSelector(
  getStateManagementState,
  (state: StateManagementState) => state.stateEnumerations
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

export const getStateEnumerationsForSelectedStateVariable = createSelector(
  getStateEnumerations,
  getSelectedStateVariable,
  (stateEnumerations: StateEnumerationMap, selectedStateVariable: StateVariable): StateEnumeration[] => {
    const selectedStateEnumerations: StateEnumeration[] = [];

    if (stateEnumerations) {
      const keys = Object.keys(stateEnumerations);

      // Return the enumerations for the current state variable if we come across them.
      if (selectedStateVariable && keys.length > 0) {
        for (const id of keys) {
          if (id === String(selectedStateVariable.id)) {
            for (const enumeration of stateEnumerations[id]) {
              selectedStateEnumerations.push({
                ...enumeration
              });
            }
          }
        }
      }
    }

    return selectedStateEnumerations;
  }
);
