import { initialState, reducer, StateState } from './state.reducer';
import { StateActions } from '../actions';
import { StateMap, RelationshipMap, StateEnumerationMap, StateEnumeration } from '../models';
import { relationshipMap, stateVariableMap, stateEnumerationList, stateEnumerationMap, identifierSet, identifierList } from '../mocks';

describe('StateManagementReducer', () => {
  describe('createRelationshipSuccess', () => {
    it('should set relationships and selectedRelationship after creating a relationship', () => {
      const relationships: RelationshipMap = {
        ...relationshipMap
      };
      const relationshipId = 1;
      const relationship = relationships[relationshipId];

      const stateState: StateState = reducer(
        { ...initialState },
        StateActions.createRelationshipSuccess({
          relationship
        })
      );

      expect(stateState).toEqual({
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

  describe('createStateSuccess', () => {
    it('should set the selectedState, and created state after a create', () => {
      const stateVariables: StateVariableMap = {
        ...stateVariableMap
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
        ...stateVariableMap
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
        ...relationshipMap
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
        ...stateVariableMap
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
      const enumerationsList: StateEnumeration[] = stateEnumerationList;
      const enumerationMap: StateEnumerationMap = stateEnumerationMap;

      const state: StateManagementState = reducer(
        { ...initialState },
        StateVariableActions.saveEnumerationsSuccess({ enumerations: enumerationsList })
      );

      expect(state).toEqual({
        ...initialState,
        stateEnumerations: enumerationMap
      });
    });
  });

  describe('setIdentifiers', () => {
    it('should set identifiers', () => {
      const identifiers: Set<string> = new Set(identifierSet);

      const state: StateManagementState = reducer(
        { ...initialState },
        StateVariableActions.setIdentifiers({ identifiers: identifierList })
      );

      expect(state).toEqual({
        ...initialState,
        identifiers
      });
    });
  });

  describe('setRelationships', () => {
    it('should set relationships', () => {
      const relationships: RelationshipMap = relationshipMap;

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
      const state: StateManagementState = reducer(
        { ...initialState },
        StateVariableActions.setStateEnumerations({ stateEnumerations: stateEnumerationMap })
      );

      expect(state).toEqual({
        ...initialState,
        stateEnumerations: stateEnumerationMap
      });
    });
  });

  describe('setSelectedRelationship', () => {
    it('should set selectedRelationship', () => {
      const relationship = relationshipMap[1];

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
      const stateVariable = stateVariableMap[1];

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
      const stateVariables = stateVariableMap;

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
