import { initialState, reducer, StateState } from './state.reducer';
import { StateActions } from '../actions';
import {
  mockStateMap,
  mockStateEnumerationList,
  mockStateEnumerationMap,
  mockStateIdentifierMap, mockStates
} from '../mocks';

describe('StateManagementReducer', () => {
  describe('createStateSuccess', () => {
    it('should set the selectedState, and update the stateIdentifierMap after creating a state', () => {
      const state = {
        id: 3,
        identifier: 'TEST_2',
        displayName: 'Test 2',
        type: '1',
        units: '1',
        source: '1',
        subsystem: '1',
        description: '1'
      };

      const stateState: StateState = reducer(
        {
          ...initialState,
          stateIdentifierMap: {
            ...mockStateIdentifierMap
          },
          stateMap: {
            ...mockStateMap
          }
        },
        StateActions.createStateSuccess({
          state
        })
      );

      expect(stateState).toEqual({
        ...initialState,
        selectedState: state,
        stateIdentifierMap: {
          ...stateState.stateIdentifierMap,
          [state.identifier]: state.id
        },
        stateMap: {
          ...stateState.stateMap,
          [state.id]: {
            ...state
          }
        }
      });
    });
  });

  describe('createStatesSuccess', () => {
    it('should set stateMap when we create a batch of new states', () => {
      const stateMap = {
        ...mockStateMap
      };

      const stateState: StateState = reducer(
        { ...initialState },
        StateActions.createStatesSuccess({
          stateMap
        })
      );

      expect(stateState).toEqual({
        ...initialState,
        stateMap: {
          ...stateMap
        }
      });
    });
  });

  describe('updateStateSuccess', () => {
    it('should set the selectedState, and update the stateIdentifierMap after editing a state', () => {
      const state = {
        id: 2,
        identifier: 'TEST_2',
        displayName: 'Test 2',
        type: 'test string 2',
        units: 'na',
        source: 'na',
        subsystem: 'na',
        description: 'This is test string 2.'
      };

      const stateState: StateState = reducer(
        {
          ...initialState,
          stateIdentifierMap: {
            ...mockStateIdentifierMap
          },
          stateMap: {
            ...mockStateMap
          }
        },
        StateActions.updateStateSuccess({
          state
        })
      );

      expect(stateState).toEqual({
        ...initialState,
        selectedState: state,
        stateIdentifierMap: {
          ...stateState.stateIdentifierMap,
          [state.identifier]: state.id
        },
        stateMap: {
          ...stateState.stateMap,
          [state.id]: {
            ...state
          }
        }
      });
    });
  });

  describe('saveEnumerationsSuccess', () => {
    it('should set enumerations after saving enumerations', () => {
      const enumerationsList = [
        ...mockStateEnumerationList
      ];

      const stateState: StateState = reducer(
        { ...initialState },
        StateActions.saveEnumerationsSuccess({
          enumerations: enumerationsList
        })
      );

      expect(stateState).toEqual({
        ...initialState,
        stateEnumerationMap: mockStateEnumerationMap
      });
    });
  });

  describe('setStateEnumerations', () => {
    it('should set stateEnumerations', () => {
      const stateEnumerationMap = {
        ...mockStateEnumerationMap
      };

      const stateState: StateState = reducer(
        { ...initialState },
        StateActions.setStateEnumerations({
          stateEnumerationMap
        })
      );

      expect(stateState).toEqual({
        ...initialState,
        stateEnumerationMap: mockStateEnumerationMap
      });
    });
  });

  describe('setSelectedState', () => {
    it('should set selectedState', () => {
      const state = {
        ...mockStateMap[1]
      };

      const stateState: StateState = reducer(
        { ...initialState },
        StateActions.setSelectedState({
          state
        })
      );

      expect(stateState).toEqual({
        ...initialState,
        selectedState: state
      });
    });
  });

  describe('setStates', () => {
    it('should set states', () => {
      const stateState: StateState = reducer(
        { ...initialState },
        StateActions.setStates({
          states: [
            ...mockStates
          ]
        })
      );

      expect(stateState).toEqual({
        ...initialState,
        stateIdentifierMap: {
          ...stateState.stateIdentifierMap
        },
        stateMap: {
          ...stateState.stateMap
        }
      });
    });
  });
});
