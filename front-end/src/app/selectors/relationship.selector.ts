import { createSelector, createFeatureSelector } from '@ngrx/store';

import { RelationshipState } from '../reducers/relationship.reducer';

const getRelationshipState = createFeatureSelector<RelationshipState>('relationships');

export const getRelationships = createSelector(
  getRelationshipState,
  (relationshipState: RelationshipState) => relationshipState.relationships
);

export const getRelationshipHistory = createSelector(
  getRelationshipState,
  (relationshipState: RelationshipState) => relationshipState.relationshipHistory
);

export const getSelectedRelationship = createSelector(
  getRelationshipState,
  (relationshipState: RelationshipState) => relationshipState.selectedRelationship
);
