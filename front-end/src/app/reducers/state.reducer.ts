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
  on(StateActions.createRelationshipSuccess, (appState, { relationship }) => {
    return modifyRelationship(appState, relationship);
  }),
  on(StateActions.createStateSuccess, (appState, { state }) => {
    return modifyState(appState, state);
  }),
  on(StateActions.createStatesSuccess, (appState, { stateMap }) => ({
    ...appState,
    stateMap: {
      ...stateMap
    }
  })),
  on(StateActions.editRelationshipSuccess, (appState, { relationship }) => {
    return modifyRelationship(appState, relationship);
  }),
  on(StateActions.editStateSuccess, (appState, { state }) => {
    return modifyState(appState, state);
  }),
  on(StateActions.saveEnumerationsSuccess, (state, { enumerations }) => {
    const enumerationMap: StateEnumerationMap = {};
    let stateId = null;

    for (const enumeration of enumerations) {
      stateId = enumeration.stateId;

      if (enumerationMap[stateId] === undefined) {
        enumerationMap[stateId] = [];
      }

      enumerationMap[stateId].push(enumeration);
    }

    return {
      ...state,
      stateEnumerations: {
        ...enumerationMap
      }
    };
  }),
  on(StateActions.setIdentifiers, (appState, { identifiers }) => {
    const identifierSet = new Set<string>();

    if (identifiers) {
      for (const identifier of identifiers) {
        identifierSet.add(identifier);
      }
    }

    return {
      ...appState,
      identifierSet
    };
  }),
  on(StateActions.setRelationships, (appState, { relationships }) => ({
    ...appState,
    relationships
  })),
  on(StateActions.setRelationshipHistory, (appState, { relationshipHistory }) => ({
    ...appState,
    relationshipHistory
  })),
  on(StateActions.setStateEnumerations, (appState, { stateEnumerations }) => ({
    ...appState,
    stateEnumerations
  })),
  on(StateActions.setStateHistory, (appState, { stateHistoryMap }) => ({
    ...appState,
    stateHistoryMap
  })),
  on(StateActions.setStates, (appState, { stateMap }) => ({
    ...appState,
    stateMap
  })),
  on(StateActions.setSelectedRelationship, (appState, { relationship }) => ({
    ...appState,
    relationship
  })),
  on(StateActions.setSelectedState, (appState, { state }) => ({
    ...appState,
    selectedState: state
  })),
  on(FileUploadActions.uploadEnumerationsSuccess, (state, action) => ({
    ...state,
    stateEnumerations: {
      ...action.enumerations
    }
  })),
  on(FileUploadActions.uploadRelationshipsSuccess, (state, action) => ({
    ...state,
    relationships: {
      ...state.relationships,
      ...action.relationshipMap
    }
  })),
  on(FileUploadActions.uploadStatesSuccess, (appState, { stateMap }) => ({
    ...appState,
    stateMap: {
      ...appState.stateMap,
      ...stateMap
    }
  }))
);

function modifyRelationship(appState: StateState, relationship: Relationship): StateState {
  return {
    ...appState,
    selectedRelationship: relationship,
    relationships: {
      ...appState.relationships,
      [relationship.id]: {
        ...relationship
      }
    }
  };
}

function modifyState(appState: StateState, state: State): StateState {
  return {
    ...appState,
    selectedState: state,
    stateMap: {
      ...appState.stateMap,
      [state.id]: {
        ...state
      }
    }
  };
}
