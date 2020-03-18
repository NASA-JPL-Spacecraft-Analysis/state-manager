import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StateManagementState } from '../reducers/state-management.reducer';
import { StateEnumeration, StateEnumerationMap, StateVariable } from '../models';

const getStatesState = createFeatureSelector<StateManagementState>('states');

export const getIdentifiers = createSelector(
  getStatesState,
  (state: StateManagementState) => state.identifiers
);

export const getRelationships = createSelector(
  getStatesState,
  (state: StateManagementState) => state.relationships
);

export const getRelationshipHistory = createSelector(
  getStatesState,
  (state: StateManagementState) => state.relationshipHistory
)

export const getStateEnumerations = createSelector(
  getStatesState,
  (state: StateManagementState) => state.stateEnumerations
);

export const getSelectedRelationship = createSelector(
  getStatesState,
  (state: StateManagementState) => state.selectedRelationship
);

export const getSelectedStateVariable = createSelector(
  getStatesState,
  (state: StateManagementState) => state.selectedStateVariable
);

/**
 * Gets the enumerations for the selected state variable.
 * Only look for enumerations if we have enumerations, a selected state variable,
 * and we have enumerations for the selected state variable.
 */
export const getStateEnumerationsForSelectedStateVariable = createSelector(
  getStateEnumerations,
  getSelectedStateVariable,
  (stateEnumerations: StateEnumerationMap, selectedStateVariable: StateVariable): StateEnumeration[] => {
    const selectedStateEnumerations: StateEnumeration[] = [];

    if (stateEnumerations && selectedStateVariable && stateEnumerations[selectedStateVariable.id]) {
      for (const enumeration of stateEnumerations[selectedStateVariable.id]) {
        selectedStateEnumerations.push({
          ...enumeration
        });
      }
    }

    return selectedStateEnumerations;
  }
);

export const getStateVariables = createSelector(
  getStatesState,
  (state: StateManagementState) => state.stateVariables
);
