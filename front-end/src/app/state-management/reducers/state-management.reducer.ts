import { createReducer, on } from '@ngrx/store';

import { StateVariableActions } from '../actions';
import { StateVariable } from '../models';

export interface StateManagementState {
  stateVariables: StateVariable[];
}

export const initialState: StateManagementState = {
  stateVariables: []
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
  on(StateVariableActions.setStateVariables, (state, action) => ({
    ...state,
    stateVariables: action.stateVariables
  }))
);
