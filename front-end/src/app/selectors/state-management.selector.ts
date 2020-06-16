import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StateState } from '../reducers/state.reducer';
import { StateEnumeration, StateEnumerationMap, State } from '../models';

const getStatesState = createFeatureSelector<StateState>('states');

export const getStateIdentifiers = createSelector(
  getStatesState,
  (stateState: StateState) => stateState.stateIdentifiers
);

export const getRelationships = createSelector(
  getStatesState,
  (stateState: StateState) => stateState.relationships
);

export const getRelationshipHistory = createSelector(
  getStatesState,
  (stateState: StateState) => stateState.relationshipHistory
);

export const getStateEnumerations = createSelector(
  getStatesState,
  (stateState: StateState) => stateState.stateEnumerationMap
);

export const getStateHistory = createSelector(
  getStatesState,
  (stateState: StateState) => stateState.stateHistoryMap
);

export const getSelectedRelationship = createSelector(
  getStatesState,
  (stateState: StateState) => stateState.selectedRelationship
);

export const getSelectedState = createSelector(
  getStatesState,
  (stateState: StateState) => stateState.selectedState
);

/**
 * Gets the enumerations for the selected state.
 * Only look for enumerations if we have enumerations, a selected state,
 * and we have enumerations for the selected state.
 */
export const getStateEnumerationsForSelectedState = createSelector(
  getStateEnumerations,
  getSelectedState,
  (stateEnumerationMap: StateEnumerationMap, selectedState: State): StateEnumeration[] => {
    const selectedStateEnumerations: StateEnumeration[] = [];

    if (stateEnumerationMap && selectedState && stateEnumerationMap[selectedState.id]) {
      for (const enumeration of stateEnumerationMap[selectedState.id]) {
        selectedStateEnumerations.push({
          ...enumeration
        });
      }
    }

    return selectedStateEnumerations;
  }
);

export const getStates = createSelector(
  getStatesState,
  (stateState: StateState) => stateState.stateMap
);
