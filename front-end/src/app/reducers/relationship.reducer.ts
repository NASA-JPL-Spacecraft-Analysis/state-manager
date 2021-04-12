import { createReducer, on } from '@ngrx/store';

import { RelationshipMap, Relationship } from '../models';
import { RelationshipActions, FileUploadActions } from '../actions';

export interface RelationshipState {
  relationships: RelationshipMap;
  relationshipHistory: RelationshipMap;
  selectedRelationship: Relationship;
}

export const initialState: RelationshipState = {
  relationships: null,
  relationshipHistory: null,
  selectedRelationship: null
};

export const reducer = createReducer(
  initialState,
  on(RelationshipActions.createRelationshipSuccess, (relationshipState, { relationship }) =>
    modifyRelationship(relationshipState, relationship)
  ),
  on(RelationshipActions.setRelationships, (relationshipState, { relationships }) => ({
    ...relationshipState,
    relationships: mapRelationships(relationships)
  })),
  on(RelationshipActions.setRelationshipHistory, (relationshipState, { relationshipHistory }) => ({
    ...relationshipState,
    relationshipHistory: mapRelationships(relationshipHistory)
  })),
  on(RelationshipActions.setSelectedRelationship, (relationshipState, { relationship }) => ({
    ...relationshipState,
    selectedRelationship: relationship
  })),
  on(RelationshipActions.updateRelationshipSuccess, (relationshipState, { relationship }) =>
    modifyRelationship(relationshipState, relationship)
  ),
  on(FileUploadActions.uploadRelationshipsSuccess, (relationshipState, { relationships }) => ({
    ...relationshipState,
    relationships: {
      ...relationshipState.relationships,
      ...mapRelationships(relationships)
    }
  }))
);

const modifyRelationship = (relationshipState: RelationshipState, relationship: Relationship): RelationshipState => ({
  ...relationshipState,
  selectedRelationship: relationship,
  relationships: {
    ...relationshipState.relationships,
    [relationship.id]: {
      ...relationship
    }
  }
});

const mapRelationships = (relationships: Relationship[]): RelationshipMap => {
  const relationshipMap = {};

  for (const relationship of relationships) {
    relationshipMap[relationship.id] = relationship;
  }

  return relationshipMap;
};
