import { createReducer, on } from '@ngrx/store';

import { StateVariableActions } from '../actions';
import { StateVariable } from '../models';

export interface StateManagementState {
  stateVariables: StateVariable[];
  selectedStateVariable: StateVariable;
  identifiers: Set<string>;
}

export const initialState: StateManagementState = {
  stateVariables: [],
  selectedStateVariable: null,
  identifiers: new Set<string>()
};

export const reducer = createReducer(
  initialState,
  on(StateVariableActions.createStateVariableSuccess, (state, action) => {
    const stateVariables = [
      ...state.stateVariables
    ];

    stateVariables.push(action.stateVariable);

    return {
      ...state,
      stateVariables,
      selectedStateVariable: action.stateVariable
    };
  }),
  on(StateVariableActions.editStateVariableSuccess, (state, action) => {
    const stateVariables = [
      ...state.stateVariables
    ];
    let index = 0;

    for (const stateVariable of stateVariables) {
      if (stateVariable.id === action.stateVariable.id) {
        stateVariables[index] = action.stateVariable;
      }

      index++;
    }

    return {
      ...state,
      stateVariables,
      selectedStateVariable: action.stateVariable
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
  on(StateVariableActions.setStateVariables, (state, action) => ({
    ...state,
    stateVariables: action.stateVariables
  })),
  on(StateVariableActions.setSelectedStateVariable, (state, action) => ({
    ...state,
    selectedStateVariable: action.stateVariable
  }))
);
