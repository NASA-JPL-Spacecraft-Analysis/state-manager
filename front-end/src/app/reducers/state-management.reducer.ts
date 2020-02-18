import { createReducer, on } from '@ngrx/store';

import { StateVariableActions } from '../actions';
import { RelationshipMap, StateVariable, StateEnumerationMap, StateVariableMap, Relationship } from '../models';

export interface StateManagementState {
  identifiers: Set<string>;
  relationships: RelationshipMap;
  selectedRelationship: Relationship;
  selectedStateVariable: StateVariable;
  stateEnumerations: StateEnumerationMap;
  stateVariables: StateVariableMap;
}

export const initialState: StateManagementState = {
  identifiers: new Set<string>(),
  relationships: null,
  selectedRelationship: null,
  selectedStateVariable: null,
  stateEnumerations: null,
  stateVariables: null
};

export const reducer = createReducer(
  initialState,
  on(StateVariableActions.createStateVariableSuccess, (state, action) => ({
    ...state,
    selectedStateVariable: action.stateVariable,
    stateVariables: {
      ...state.stateVariables,
      [action.stateVariable.id]: {
        ...action.stateVariable
      }
    }
  })),
  on(StateVariableActions.createStateVariablesSuccess, (state, action) => ({
    ...state,
    stateVariables: {
      ...action.stateVariables
    }
  })),
  on(StateVariableActions.editStateVariableSuccess, (state, action) => ({
    ...state,
    selectedStateVariable: action.stateVariable,
    stateVariables: {
      ...state.stateVariables,
      [action.stateVariable.id]: {
        ...action.stateVariable
      }
    }
  })),
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
  on(StateVariableActions.setStateEnumerations, (state, action) => ({
    ...state,
    stateEnumerations: action.stateEnumerations
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
  }))
);
