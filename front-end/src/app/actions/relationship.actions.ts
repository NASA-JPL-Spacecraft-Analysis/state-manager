import { createAction, props } from '@ngrx/store';

import { Relationship, RelationshipHistory } from '../models';

export const createRelationship = createAction(
  '[relationship] createRelationship',
  props<{ collectionId: string, relationship: Relationship }>()
);

export const createRelationshipFailure = createAction(
  '[relationship] createRelationshipFailure',
  props<{ error: Error }>()
);

export const createRelationshipSuccess = createAction(
  '[relationship] createRelationshipSuccess',
  props<{ relationship: Relationship }>()
);

export const fetchRelationshipsFailure = createAction(
  '[relationship] fetchRelationshipsFailure',
  props<{ error: Error }>()
);

export const fetchRelationshipHistoryFailure = createAction(
  '[relationship] fetchRelationshipHistoryFailure',
  props<{ error: Error }>()
);

export const setRelationships = createAction(
  '[relationship] setRelationships',
  props<{ relationships: Relationship[] }>()
);

export const setRelationshipHistory = createAction(
  '[relationship] setRelationshipHistory',
  props<{ relationshipHistory: RelationshipHistory[] }>()
);

export const setSelectedRelationship = createAction(
  '[relationship] setSelectedRelationship',
  props<{ relationship: Relationship }>()
);

export const updateRelationship = createAction(
  '[relationship] updateRelationship',
  props<{ relationship: Relationship }>()
);

export const updateRelationshipFailure = createAction(
  '[relationship] updateRelationshipFailure',
  props<{ error: Error }>()
);

export const updateRelationshipSuccess = createAction(
  '[relationship] updateRelationshipSuccess',
  props<{ relationship: Relationship }>()
);
