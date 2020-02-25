import { initialState, reducer, StateManagementState } from './state-management.reducer';
import { StateVariableActions } from '../actions';
import {
  getMockStateVariables,
  getMockIdentifiersSet,
  getMockIdentifiersArray,
  getMockRelationships,
  getMockStateEnumerations,
  getMockStateEnumerationsArray
} from '../services/mock-state-management.service';
import { StateVariableMap, RelationshipMap, StateEnumerationMap, StateEnumeration } from '../models';

describe('StateManagementReducer', () => {
  const mockEnumerations: StateEnumerationMap = getMockStateEnumerations();
  const mockEnumerationsArray: StateEnumeration[] = getMockStateEnumerationsArray();
  const mockIdentifiersArray: string[] = getMockIdentifiersArray();
  const mockIdentifiersSet: Set<string> = getMockIdentifiersSet();
  const mockRelationships: RelationshipMap = getMockRelationships();
  const mockStateVariables: StateVariableMap = getMockStateVariables();

  describe('createRelationshipSuccess', () => {
    it('should set relationships and selectedRelationship after creating a relationship', () => {
      const relationships: RelationshipMap = {
        ...mockRelationships
      };
      const relationshipId = 1;
      const relationship = relationships[relationshipId];

      const state: StateManagementState = reducer(
        { ...initialState },
        StateVariableActions.createRelationshipSuccess({
          relationship
        })
      );

      expect(state).toEqual({
        ...initialState,
        selectedRelationship: relationship,
        relationships: {
          [relationshipId]: {
            ...relationship
          }
        }
      });
    });
  });

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

  describe('createStateVariablesSuccess', () => {
    it('should set stateVariables when we create a batch of new stateVariables', () => {
      const stateVariables: StateVariableMap = {
        ...mockStateVariables
      };

      const state: StateManagementState = reducer(
        { ...initialState },
        StateVariableActions.createStateVariablesSuccess({
          stateVariables
        })
      );

      expect(state).toEqual({
        ...initialState,
        stateVariables: {
          ...stateVariables
        }
      });
    });
  });

  describe('editRelationshipSuccess', () => {
    it('should set relationships and selectedRelationship after editing a relationship', () => {
      const relationships: RelationshipMap = {
        ...mockRelationships
      };
      const relationshipId = 1;
      const relationship = relationships[relationshipId];

      const state: StateManagementState = reducer(
        { ...initialState },
        StateVariableActions.editRelationshipSuccess({ relationship })
      );

      expect(state).toEqual({
        ...initialState,
        selectedRelationship: relationship,
        relationships: {
          [relationshipId]: {
            ...relationship
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

  describe('saveEnumerationsSuccess', () => {
    it('should set enumerations after saving enumerations', () => {
      const enumerationsArray: StateEnumeration[] = mockEnumerationsArray;
      const enumerations: StateEnumerationMap = mockEnumerations;

      const state: StateManagementState = reducer(
        { ...initialState },
        StateVariableActions.saveEnumerationsSuccess({ enumerations: enumerationsArray })
      );

      expect(state).toEqual({
        ...initialState,
        stateEnumerations: enumerations
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

  describe('setRelationships', () => {
    it('should set relationships', () => {
      const relationships = mockRelationships;

      const state: StateManagementState = reducer(
        { ...initialState },
        StateVariableActions.setRelationships({ relationships })
      );

      expect(state).toEqual({
        ...initialState,
        relationships
      });
    });
  });

  describe('setStateEnumerations', () => {
    it('should set stateEnumerations', () => {
      const enumerations = mockEnumerations;

      const state: StateManagementState = reducer(
        { ...initialState },
        StateVariableActions.setStateEnumerations({ stateEnumerations: enumerations })
      );

      expect(state).toEqual({
        ...initialState,
        stateEnumerations: enumerations
      });
    });
  });

  describe('setSelectedRelationship', () => {
    it('should set selectedRelationship', () => {
      const relationship = mockRelationships[1];

      const state: StateManagementState = reducer(
        { ...initialState },
        StateVariableActions.setSelectedRelationship({ relationship })
      );

      expect(state).toEqual({
        ...initialState,
        selectedRelationship: relationship
      });
    });
  });

  describe('setSelectedStateVariable', () => {
    it('should set selectedStateVariable', () => {
      const stateVariable = mockStateVariables[1];

      const state: StateManagementState = reducer(
        { ...initialState },
        StateVariableActions.setSelectedStateVariable({ stateVariable })
      );

      expect(state).toEqual({
        ...initialState,
        selectedStateVariable: stateVariable
      });
    });
  });

  describe('setStateVariables', () => {
    it('should set stateVariables', () => {
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
});
