import { mockRelationship, mockRelationships, mockRelationshipsMap } from '../mocks';
import { RelationshipState, reducer, initialState } from './relationship.reducer';
import { RelationshipActions } from '../actions';

describe('RelationshipReducer', () => {
  describe('createRelationshipSuccess', () => {
    it('should set relationships and selectedRelationship after creating a relationship', () => {
      const relationshipState: RelationshipState = reducer(
        { ...initialState},
        RelationshipActions.createRelationshipSuccess({
          relationship: mockRelationship
        })
      );

      expect(relationshipState).toEqual({
        ...initialState,
        selectedRelationship: mockRelationship,
        relationships: {
          [mockRelationship.id]: mockRelationship
        }
      });
    });
  });

  describe('updateRelationshipSuccess', () => {
    it('should set relationships and selectedRelationship after editing a relationship', () => {
      const relationshipState: RelationshipState = reducer(
        { ...initialState},
        RelationshipActions.updateRelationshipSuccess({
          relationship: mockRelationship
        })
      );

      expect(relationshipState).toEqual({
        ...initialState,
        selectedRelationship: mockRelationship,
        relationships: {
          [mockRelationship.id]: mockRelationship
        }
      });
    });
  });

  describe('setRelationships', () => {
    it('should set relationships', () => {
      const relationships = [
        ...mockRelationships
      ];

      const relationshipState: RelationshipState = reducer(
        { ...initialState },
        RelationshipActions.setRelationships({
          relationships
        })
      );

      expect(relationshipState).toEqual({
        ...initialState,
        relationships: {
          ...mockRelationshipsMap
        }
      });
    });
  });

  describe('setSelectedRelationship', () => {
    it('should set selectedRelationship', () => {
      const relationship = {
        ...mockRelationships[1]
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
