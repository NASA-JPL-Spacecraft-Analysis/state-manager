import { createAction, props } from '@ngrx/store';

import { Event, Group, InformationTypes, Relationship } from '../models';

export const uploadStateEnumerations = createAction(
  '[file upload] uploadStateEnumerations',
  props<{ collectionId: string; file: File }>()
);

export const uploadStateEnumerationsFailure = createAction(
  '[file upload] uploadStateEnumerationsFailure',
  props<{ error: Error }>()
);

export const uploadEvents = createAction(
  '[file upload] uploadEvents',
  props<{ file: File; collectionId: string }>()
);

export const uploadEventsFailure  = createAction(
  '[file upload] uploadEventsFailure',
  props<{ error: Error }>()
);

export const uploadEventsSuccess = createAction(
  '[file upload] uploadEventsSuccess',
  props<{ events: Event[] }>()
);

export const uploadGroups = createAction(
  '[file upload] uploadGroups',
  props<{ file: File, collectionId: string }>()
);

export const uploadGroupsFailure  = createAction(
  '[file upload] uploadGroupsFailure',
  props<{ error: Error }>()
);

export const uploadGroupsSuccess = createAction(
  '[file upload] uploadGroupsSuccess',
  props<{ groups: Group[] }>()
);

export const uploadInformationTypes = createAction(
  '[file upload] uploadInformationTypes',
  props<{ file: File; collectionId: string }>()
);

export const uploadInformationTypesFailure = createAction(
  '[file upload] uploadInformationTypesFailure',
  props<{ error: Error }>()
);

export const uploadInformationTypesSuccess = createAction(
  '[file upload] uploadInformationTypesSuccess',
  props<{ informationTypes: InformationTypes[] }>()
);

export const uploadRelationships = createAction(
  '[file upload] uploadRelationships',
  props<{ file: File; collectionId: string }>()
);

export const uploadRelationshipsFailure = createAction(
  '[file upload] uploadRelationshipsFailure',
  props<{ error: Error }>()
);

export const uploadRelationshipsSuccess = createAction(
  '[file upload] uploadRelationshipsSuccess',
  props<{ relationships: Relationship[] }>()
);

export const uploadStates = createAction(
  '[file upload] uploadStates',
  props<{ collectionId: string; file: File }>()
);

export const uploadStatesFailure = createAction(
  '[file upload] uploadStatesFailure',
  props<{ error: Error }>()
);
