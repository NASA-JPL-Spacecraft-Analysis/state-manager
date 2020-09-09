import { createAction, props } from '@ngrx/store';

import { Relationship, RelationshipHistory } from '../models';

export const createRelationship = createAction(
  '[relationship] createRelationship',
  props<{ collectionId: number, relationship: Relationship }>()
);

export const createRelationshipFailure = createAction(
  '[relationship] createRelationshipFailure',
  props<{ error: Error }>()
);

export const createRelationshipSuccess = createAction(
  '[relationship] createRelationshipSuccess',
  props<{ relationship: Relationship }>()
);

export const editRelationship = createAction(
  '[relationship] editRelationship',
  props<{ collectionId: number, relationship: Relationship }>()
);

export const editRelationshipFailure = createAction(
  '[relationship] editRelationshipFailure',
  props<{ error: Error }>()
);

export const editRelationshipSuccess = createAction(
  '[relationship] editRelationshipSuccess',
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
