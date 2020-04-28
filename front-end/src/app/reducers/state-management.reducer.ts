import { createReducer, on } from '@ngrx/store';

import { StateVariableActions, FileUploadActions } from '../actions';
import { RelationshipMap, StateVariable, StateEnumerationMap, StateVariableMap, Relationship, InformationTypesMap } from '../models';

export interface StateManagementState {
  identifiers: Set<string>;
  informationTypes: InformationTypesMap;
  relationships: RelationshipMap;
  relationshipHistory: RelationshipMap;
  selectedRelationship: Relationship;
  selectedStateVariable: StateVariable;
  stateEnumerations: StateEnumerationMap;
  stateHistory: StateVariableMap;
  stateVariables: StateVariableMap;
}

export const initialState: StateManagementState = {
  identifiers: new Set<string>(),
  informationTypes: null,
  relationships: null,
  relationshipHistory: null,
  selectedRelationship: null,
  selectedStateVariable: null,
  stateEnumerations: null,
  stateHistory: null,
  stateVariables: null
};

export const reducer = createReducer(
  initialState,
  on(StateVariableActions.createRelationshipSuccess, (state, action) => {
    return modifyRelationship(state, action.relationship);
  }),
  on(StateVariableActions.createStateVariableSuccess, (state, action) => {
    return modifyStateVariable(state, action.stateVariable);
  }),
  on(StateVariableActions.createStateVariablesSuccess, (state, action) => ({
    ...state,
    stateVariables: {
      ...action.stateVariables
    }
  })),
  on(StateVariableActions.editRelationshipSuccess, (state, action) => {
    return modifyRelationship(state, action.relationship);
  }),
  on(StateVariableActions.editStateVariableSuccess, (state, action) => {
    return modifyStateVariable(state, action.stateVariable);
  }),
  on(StateVariableActions.saveEnumerationsSuccess, (state, action) => {
    const enumerations: StateEnumerationMap = {};
    let stateVariableId = null;

    for (const enumeration of action.enumerations) {
      stateVariableId = enumeration.stateVariableId;

      if (enumerations[stateVariableId] === undefined) {
        enumerations[stateVariableId] = [];
      }

      enumerations[stateVariableId].push(enumeration);
    }

    return {
      ...state,
      stateEnumerations: {
        ...enumerations
      }
    };
  }),
  on(StateVariableActions.setIdentifiers, (state, action) => {
    const identifiers = new Set<string>();

    if (action.identifiers) {
      for (const identifier of action.identifiers) {
        identifiers.add(identifier);
      }
    }

    return {
      ...state,
      identifiers
    };
  }),
  on(StateVariableActions.setInformationTypes, (state, action) => ({
    ...state,
    informationTypes: action.informationTypes
  })),
  on(StateVariableActions.setRelationships, (state, action) => ({
    ...state,
    relationships: action.relationships
  })),
  on(StateVariableActions.setRelationshipHistory, (state, action) => ({
    ...state,
    relationshipHistory: action.relationshipHistory
  })),
  on(StateVariableActions.setStateEnumerations, (state, action) => ({
    ...state,
    stateEnumerations: action.stateEnumerations
  })),
  on(StateVariableActions.setStateHistory, (state, action) => ({
    ...state,
    stateHistory: action.stateHistory
  })),
  on(StateVariableActions.setStateVariables, (state, action) => ({
    ...state,
    stateVariables: action.stateVariables
  })),
  on(StateVariableActions.setSelectedRelationship, (state, action) => ({
    ...state,
    selectedRelationship: action.relationship
  })),
  on(StateVariableActions.setSelectedStateVariable, (state, action) => ({
    ...state,
    selectedStateVariable: action.stateVariable
  })),
  on(StateVariableActions.uploadEnumerationsSuccess, (state, action) => ({
    ...state,
    stateEnumerations: {
      ...action.enumerations
    }
  })),
  on(FileUploadActions.uploadStateVariablesSuccess, (state, action) => ({
    ...state,
    stateVariables: {
      ...state.stateVariables,
      ...action.stateVariableMap
    }
  }))
);

function modifyRelationship(state: StateManagementState, relationship: Relationship): StateManagementState {
  return {
    ...state,
    selectedRelationship: relationship,
    relationships: {
      ...state.relationships,
      [relationship.id]: {
        ...relationship
      }
    }
  };
}

function modifyStateVariable(state: StateManagementState, stateVariable: StateVariable): StateManagementState {
  return {
    ...state,
    selectedStateVariable: stateVariable,
    stateVariables: {
      ...state.stateVariables,
      [stateVariable.id]: {
        ...stateVariable
      }
    }
  };
}
