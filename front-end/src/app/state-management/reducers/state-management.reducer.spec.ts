import { initialState, reducer, StateManagementState } from './state-management.reducer';
import { StateVariableActions } from '../actions';
import { getMockStateVariables, getMockIdentifiersSet, getMockIdentifiersArray } from '../services/mock-state-management.service';
import { StateVariableMap } from '../models';

describe('StateManagementReducer', () => {
  const mockStateVariables: StateVariableMap = getMockStateVariables();
  const mockIdentifiersArray: string[] = getMockIdentifiersArray();
  const mockIdentifiersSet: Set<string> = getMockIdentifiersSet();

  describe('createStateVariableSuccess', () => {
    it('should set the selectedStateVariable, and created stateVariable after a create', () => {
      const stateVariables: StateVariableMap = {
        ...mockStateVariables
      };
      const stateVariableId = 1;
      const stateVariable = stateVariables[stateVariableId];

      const state: StateManagementState = reducer(
        { ...initialState },
        StateVariableActions.createStateVariableSuccess({
          stateVariable
        })
      );

      expect(state).toEqual({
        ...initialState,
        selectedStateVariable: stateVariable,
        stateVariables: {
          [stateVariableId]: {
            ...stateVariable
          }
        }
      });
    });
  });

  describe('editStateVariableSuccess', () => {
    it('should set the selectedStateVariable, and edited state variables after an edit', () => {
      const stateVariables: StateVariableMap = {
        ...mockStateVariables
      };
      const stateVariableId = 1;
      const stateVariable = stateVariables[stateVariableId];

      const state: StateManagementState = reducer(
        { ...initialState },
        StateVariableActions.editStateVariableSuccess({
          stateVariable
        })
      );

      expect(state).toEqual({
        ...initialState,
        selectedStateVariable: stateVariable,
        stateVariables: {
          [stateVariableId]: {
            ...stateVariable
          }
        }
      });
    });
  });

  describe('setIdentifiers', () => {
    it('should set identifiers', () => {
      const identifiers: Set<string> = new Set(mockIdentifiersSet);

      const state: StateManagementState = reducer(
        { ...initialState },
        StateVariableActions.setIdentifiers({ identifiers: mockIdentifiersArray })
      );

      expect(state).toEqual({
        ...initialState,
        identifiers
      });
    });
  });

  it('should set state variables', () => {
    const stateVariables = mockStateVariables;

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
