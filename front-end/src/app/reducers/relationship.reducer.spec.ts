import { RelationshipMap } from '../models';
import { mockRelationshipMap } from '../mocks';
import { RelationshipState, reducer, initialState } from './relationship.reducer';
import { RelationshipActions } from '../actions';

describe('RelationshipReducer', () => {
  describe('createRelationshipSuccess', () => {
    it('should set relationships and selectedRelationship after creating a relationship', () => {
      const relationships = {
        ...mockRelationshipMap
      };
      const relationshipId = 1;
      const relationship = relationships[relationshipId];

      const relationshipState: RelationshipState = reducer(
        { ...initialState},
        RelationshipActions.createRelationshipSuccess({
          relationship
        })
      );

      expect(relationshipState).toEqual({
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

  describe('editRelationshipSuccess', () => {
    it('should set relationships and selectedRelationship after editing a relationship', () => {
      const relationships = {
        ...mockRelationshipMap
      };
      const relationshipId = 1;
      const relationship = relationships[relationshipId];

      const relationshipState: RelationshipState = reducer(
        { ...initialState},
        RelationshipActions.editRelationshipSuccess({
          relationship
        })
      );

      expect(relationshipState).toEqual({
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

  describe('setRelationships', () => {
    it('should set relationships', () => {
      const relationships = {
        ...mockRelationshipMap
      };

      const relationshipState: RelationshipState = reducer(
        { ...initialState },
        RelationshipActions.setRelationships({
          relationships
        })
      );

      expect(relationshipState).toEqual({
        ...initialState,
        relationships
      });
    });
  });

  describe('setSelectedRelationship', () => {
    it('should set selectedRelationship', () => {
      const relationship = {
        ...mockRelationshipMap[1]
      };

      const relationshipState: RelationshipState = reducer(
        { ...initialState },
        RelationshipActions.setSelectedRelationship({
          relationship
        })
      );

      expect(relationshipState).toEqual({
        ...initialState,
        selectedRelationship: relationship
      });
    });
  });
});
