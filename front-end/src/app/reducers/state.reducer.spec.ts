import { initialState, reducer, StateState } from './state.reducer';
import { StateActions } from '../actions';
import {
  mockStateMap,
  mockStateEnumerationList,
  mockStateEnumerationMap,
  mockIdentifierSet,
  mockIdentifierList
} from '../mocks';

describe('StateManagementReducer', () => {
  describe('createStateSuccess', () => {
    it('should set the selectedState, and created state after a create', () => {
      const stateMap = {
        ...mockStateMap
      };
      const stateId = 1;
      const state = stateMap[stateId];

      const stateState: StateState = reducer(
        { ...initialState },
        StateActions.createStateSuccess({
          state
        })
      );

      expect(stateState).toEqual({
        ...initialState,
        selectedState: state,
        stateMap: {
          [stateId]: {
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

  describe('editStateSuccess', () => {
    it('should set the selectedState, and edited states after an edit', () => {
      const stateMap = {
        ...mockStateMap
      };
      const stateId = 1;
      const state = stateMap[stateId];

      const stateState: StateState = reducer(
        { ...initialState },
        StateActions.editStateSuccess({
          state
        })
      );

      expect(stateState).toEqual({
        ...initialState,
        selectedState: state,
        stateMap: {
          [stateId]: {
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

  describe('setIdentifiers', () => {
    it('should set identifiers', () => {
      const stateIdentifiers = [
        ...mockIdentifierList
      ];

      const stateState: StateState = reducer(
        { ...initialState },
        StateActions.setStateIdentifiers({
          stateIdentifiers
        })
      );

      expect(stateState).toEqual({
        ...initialState,
        stateIdentifiers: mockIdentifierSet
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
    it('should set ', () => {
      const stateMap = {
        ...mockStateMap
      };

      const stateState: StateState = reducer(
        { ...initialState },
        StateActions.setStates({
          stateMap
        })
      );

      expect(stateState).toEqual({
        ...initialState,
        stateMap
      });
    });
  });
});
