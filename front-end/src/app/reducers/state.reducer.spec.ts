import { initialState, reducer, StateState } from './state.reducer';
import { StateActions } from '../actions';
import {
  mockStateOne,
  mockStates,
  mockStateMap,
  mockStateEnumerations,
  mockStateEnumerationMap,
  mockStateIdentifierMap
} from '../mocks';

describe('StateReducer', () => {
  describe('createStateSuccess', () => {
    it('should set the selectedState, and update the stateIdentifierMap after creating a state', () => {
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
          state: mockStateOne
        })
      );

      expect(stateState).toEqual({
        ...initialState,
        selectedState: mockStateOne,
        stateIdentifierMap: {
          ...stateState.stateIdentifierMap,
          [mockStateOne.identifier]: mockStateOne.id
        },
        stateMap: {
          ...stateState.stateMap,
          [mockStateOne.id]: {
            ...mockStateOne
          }
        }
      });
    });
  });

  describe('createStatesSuccess', () => {
    it('should set stateMap when we create a batch of new states', () => {
      const stateState: StateState = reducer(
        { ...initialState },
        StateActions.createStatesSuccess({
          states: mockStates
        })
      );

      expect(stateState).toEqual({
        ...initialState,
        stateMap: {
          ...mockStateMap
        }
      });
    });
  });

  describe('updateStateSuccess', () => {
    it('should set the selectedState, and update the stateIdentifierMap after editing a state', () => {
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
          state: mockStateOne
        })
      );

      expect(stateState).toEqual({
        ...initialState,
        selectedState: mockStateOne,
        stateIdentifierMap: {
          ...stateState.stateIdentifierMap,
          [mockStateOne.identifier]: mockStateOne.id
        },
        stateMap: {
          ...stateState.stateMap,
          [mockStateOne.id]: {
            ...mockStateOne
          }
        }
      });
    });
  });

  describe('saveEnumerationsSuccess', () => {
    it('should set enumerations after saving enumerations', () => {
      const stateState: StateState = reducer(
        { ...initialState },
        StateActions.saveEnumerationsSuccess({
          enumerations: mockStateEnumerations,
          stateId: mockStateOne.id
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
      const stateState: StateState = reducer(
        { ...initialState },
        StateActions.setStateEnumerations({
          stateEnumerations: mockStateEnumerations
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
          states: mockStates
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
