import { initialState, reducer, StateManagementState } from './state-management.reducer';
import { StateVariableActions } from '../actions';
import { getMockStateVariables, getMockIdentifiersSet, getMockIdentifiersArray } from '../services/mock-state-management.service';
import { StateVariable } from '../models';

describe('StateManagementReducer', () => {
  const mockStateVariables: StateVariable[] = getMockStateVariables();
  const mockIdentifiersArray: string[] = getMockIdentifiersArray();
  const mockIdentifiersSet: Set<string> = getMockIdentifiersSet();

  describe('createStateVariableSuccess', () => {
    it('should set state variables after a create', () => {
      const stateVariables = mockStateVariables.slice();

      const state: StateManagementState = reducer(
        { ...initialState },
        StateVariableActions.createStateVariableSuccess({ stateVariables })
      );

      expect(state).toEqual({
        ...initialState,
        stateVariables
      });
    });
  });

  describe('editStateVariableSuccess', () => {
    it('should set state variables after an edit', () => {
      const stateVariables = mockStateVariables.slice();

      const state: StateManagementState = reducer(
        { ...initialState },
        StateVariableActions.editStateVariableSuccess({ stateVariables })
      );

      expect(state).toEqual({
        ...initialState,
        stateVariables
      });
    });
  });

  describe('setIdentifiers', () => {
    it('should set identifiers', () => {
      const identifiers = mockIdentifiersArray.slice();

      const state: StateManagementState = reducer(
        { ...initialState },
        StateVariableActions.setIdentifiers({ identifiers })
      );

      expect(state).toEqual({
        ...initialState,
        identifiers: mockIdentifiersSet
      });
    });
  });

  it('should set state variables', () => {
    const stateVariables = mockStateVariables.slice();

    const state: StateManagementState = reducer(
      { ...initialState },
      StateVariableActions.setStateVariables({ stateVariables })
    );

    expect(state).toEqual({
      ...initialState,
      stateVariables
    });
  });
});
