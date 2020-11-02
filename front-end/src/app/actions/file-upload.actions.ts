import { createAction, props } from '@ngrx/store';

import { State, RelationshipMap, EventMap, InformationTypes } from '../models';

export const uploadStateEnumerations = createAction(
  '[file upload] uploadStateEnumerations',
  props<{ collectionId: number, file: File }>()
);

export const uploadStateEnumerationsFailure = createAction(
  '[file upload] uploadStateEnumerationsFailure',
  props<{ error: Error }>()
);

export const uploadEvents = createAction(
  '[file upload] uploadEvents',
  props<{ file: File, fileType: string, collectionId: number }>()
);

export const uploadEventsFailure  = createAction(
  '[file upload] uploadEventsFailure',
  props<{ error: Error }>()
);

export const uploadEventsSuccess = createAction(
  '[file upload] uploadEventsSuccess',
  props<{ eventMap: EventMap }>()
);

export const uploadInformationTypes = createAction(
  '[file upload] uploadInformationTypes',
  props<{ file: File, collectionId: number }>()
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
  props<{ file: File, fileType: string, collectionId: number }>()
);

export const uploadRelationshipsFailure = createAction(
  '[file upload] uploadRelationshipsFailure',
  props<{ error: Error }>()
);

export const uploadRelationshipsSuccess = createAction(
  '[file upload] uploadRelationshipsSuccess',
  props<{ relationshipMap: RelationshipMap }>()
);

export const uploadStates = createAction(
  '[file upload] uploadStates',
  props<{ collectionId: number, file: File }>()
);

export const uploadStatesFailure = createAction(
  '[file upload] uploadStatesFailure',
  props<{ error: Error }>()
);

export const uploadStatesSuccess = createAction(
  '[file upload] uploadStatesSuccess',
  props<{ states: State[] }>()
);
