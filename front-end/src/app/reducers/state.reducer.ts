import { createReducer, on } from '@ngrx/store';

import { StateActions, FileUploadActions } from '../actions';
import {
  RelationshipMap,
  State,
  StateEnumerationMap,
  StateMap,
  Relationship
} from '../models';

export interface StateState {
  stateIdentifiers: Set<string>;
  relationships: RelationshipMap;
  relationshipHistory: RelationshipMap;
  selectedRelationship: Relationship;
  selectedState: State;
  stateEnumerationMap: StateEnumerationMap;
  stateHistoryMap: StateMap;
  stateMap: StateMap;
}

export const initialState: StateState = {
  stateIdentifiers: new Set<string>(),
  relationships: null,
  relationshipHistory: null,
  selectedRelationship: null,
  selectedState: null,
  stateEnumerationMap: null,
  stateHistoryMap: null,
  stateMap: null
};

export const reducer = createReducer(
  initialState,
  on(StateActions.createRelationshipSuccess, (stateState, { relationship }) => {
    return modifyRelationship(stateState, relationship);
  }),
  on(StateActions.createStateSuccess, (stateState, { state }) => {
    return modifyState(stateState, state);
  }),
  on(StateActions.createStatesSuccess, (stateState, { stateMap }) => ({
    ...stateState,
    stateMap: {
      ...stateMap
    }
  })),
  on(StateActions.editRelationshipSuccess, (stateState, { relationship }) => {
    return modifyRelationship(stateState, relationship);
  }),
  on(StateActions.editStateSuccess, (stateState, { state }) => {
    return modifyState(stateState, state);
  }),
  on(StateActions.saveEnumerationsSuccess, (state, { enumerations }) => {
    const stateEnumerationMap: StateEnumerationMap = {};
    let stateId = null;

    for (const enumeration of enumerations) {
      stateId = enumeration.stateId;

      if (stateEnumerationMap[stateId] === undefined) {
        stateEnumerationMap[stateId] = [];
      }

      stateEnumerationMap[stateId].push(enumeration);
    }

    return {
      ...state,
      stateEnumerationMap: {
        ...stateEnumerationMap
      }
    };
  }),
  on(StateActions.setStateIdentifiers, (appState, { stateIdentifiers }) => {
    const stateIdentifierSet = new Set<string>();

    if (stateIdentifiers) {
      for (const stateIdentifier of stateIdentifiers) {
        stateIdentifierSet.add(stateIdentifier);
      }
    }

    return {
      ...appState,
      stateIdentifiers: stateIdentifierSet
    };
  }),
  on(StateActions.setRelationships, (appState, { relationships }) => ({
    ...appState,
    relationships
  })),
  on(StateActions.setRelationshipHistory, (stateState, { relationshipHistory }) => ({
    ...stateState,
    relationshipHistory
  })),
  on(StateActions.setStateEnumerations, (stateState, { stateEnumerationMap }) => ({
    ...stateState,
    stateEnumerationMap: {
      ...stateEnumerationMap
    }
  })),
  on(StateActions.setStateHistory, (stateState, { stateHistoryMap }) => ({
    ...stateState,
    stateHistoryMap
  })),
  on(StateActions.setStates, (stateState, { stateMap }) => ({
    ...stateState,
    stateMap
  })),
  on(StateActions.setSelectedRelationship, (stateState, { relationship }) => ({
    ...stateState,
    relationship
  })),
  on(StateActions.setSelectedState, (stateState, { state }) => ({
    ...stateState,
    selectedState: state
  })),
  on(FileUploadActions.uploadStateEnumerationsSuccess, (state, { stateEnumerationMap }) => ({
    ...state,
    stateEnumerationMap: {
      ...stateEnumerationMap
    }
  })),
  on(FileUploadActions.uploadRelationshipsSuccess, (state, action) => ({
    ...state,
    relationships: {
      ...state.relationships,
      ...action.relationshipMap
    }
  })),
  on(FileUploadActions.uploadStatesSuccess, (stateState, { stateMap }) => ({
    ...stateState,
    stateMap: {
      ...stateState.stateMap,
      ...stateMap
    }
  }))
);

function modifyRelationship(stateState: StateState, relationship: Relationship): StateState {
  return {
    ...stateState,
    selectedRelationship: relationship,
    relationships: {
      ...stateState.relationships,
      [relationship.id]: {
        ...relationship
      }
    }
  };
}

function modifyState(stateState: StateState, state: State): StateState {
  return {
    ...stateState,
    selectedState: state,
    stateMap: {
      ...stateState.stateMap,
      [state.id]: {
        ...state
      }
    }
  };
}
