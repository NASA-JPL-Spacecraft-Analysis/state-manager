import { createReducer, on } from '@ngrx/store';

import { StateVariableActions } from '../actions';
import { StateVariable } from '../models';

export interface StateManagementState {
  stateVariables: StateVariable[];
  identifiers: Set<string>;
}

export const initialState: StateManagementState = {
  stateVariables: [],
  identifiers: new Set<string>()
};

export const reducer = createReducer(
  initialState,
  on(StateVariableActions.createStateVariableSuccess, (state, action) => ({
    ...state,
    stateVariables: action.stateVariables
  })),
  on(StateVariableActions.editStateVariableSuccess, (state, action) => ({
    ...state,
    stateVariables: action.stateVariables
  })),
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
);
