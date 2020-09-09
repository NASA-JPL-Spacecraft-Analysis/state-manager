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
  on(RelationshipActions.createRelationshipSuccess, (relationshipState, { relationship }) => {
    return modifyRelationship(relationshipState, relationship);
  }),
  on(RelationshipActions.editRelationshipSuccess, (relationshipState, { relationship }) => {
    return modifyRelationship(relationshipState, relationship);
  }),
  on(RelationshipActions.setRelationships, (relationshipState, { relationships }) => {
    const relationshipMap = {};

    for (const relationship of relationships) {
      relationshipMap[relationship.id] = relationship;
    }

    return {
      ...relationshipState,
      relationships: relationshipMap
    };
  }),
  on(RelationshipActions.setRelationshipHistory, (relationshipState, { relationshipHistory }) => {
    const relationshipHistoryMap = {};

    for (const relationshipHistoryItem of relationshipHistory) {
      relationshipHistoryMap[relationshipHistoryItem.id] = relationshipHistoryItem;
    }

    return {
      ...relationshipState,
      relationshipHistory: relationshipHistoryMap
    };
  }),
  on(RelationshipActions.setSelectedRelationship, (relationshipState, { relationship }) => ({
    ...relationshipState,
    selectedRelationship: relationship
  })),
  on(FileUploadActions.uploadRelationshipsSuccess, (relationshipState, { relationshipMap }) => ({
    ...relationshipState,
    relationships: {
      ...relationshipState.relationships,
      ...relationshipMap
    }
  })),
);

function modifyRelationship(relationshipState: RelationshipState, relationship: Relationship): RelationshipState {
  return {
    ...relationshipState,
    selectedRelationship: relationship,
    relationships: {
      ...relationshipState.relationships,
      [relationship.id]: {
        ...relationship
      }
    }
  };
}
