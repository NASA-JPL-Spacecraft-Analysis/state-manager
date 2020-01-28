import { createReducer, on } from '@ngrx/store';

import { StateVariableActions } from '../actions';
import { StateVariable, StateEnumerationMap, StateVariableMap } from '../models';

export interface StateManagementState {
  identifiers: Set<string>;
  selectedStateVariable: StateVariable;
  stateEnumerations: StateEnumerationMap;
  stateVariables: StateVariableMap;
}

export const initialState: StateManagementState = {
  identifiers: new Set<string>(),
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
    const enumerationIds: string[] = [];
    const enumerations = {
      ...state.stateEnumerations
    };

    for (const enumeration of action.enumerations) {
      enumerationIds.push(String(enumeration.id));
      enumerations[enumeration.id] = enumeration;
    }

    return {
      ...state,
      selectedStateVariable: {
        ...state.selectedStateVariable,
        enumerationIds: [
          ...enumerationIds
        ]
      },
      stateEnumerations: enumerations
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
  on(StateVariableActions.setSelectedStateVariable, (state, action) => ({
    ...state,
    selectedStateVariable: action.stateVariable
  }))
);
