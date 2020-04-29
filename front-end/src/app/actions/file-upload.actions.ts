import { createAction, props } from '@ngrx/store';

import { StateVariableMap, RelationshipMap } from '../models';

export const uploadRelationships = createAction(
  '[file upload] uploadRelationships',
  props<{ file: File, fileType: string }>()
);

export const uploadRelationshipsFailure = createAction(
  '[file upload] uploadRelationshipsFailure',
  props<{ error: Error }>()
);

export const uploadRelationshipsSuccess = createAction(
  '[file upload] uploadRelationshipsSuccess',
  props<{ relationshipMap: RelationshipMap }>()
);

export const uploadStateVariables = createAction(
  '[file upload] uploadStateVariables',
  props<{ file: File, fileType: string }>()
);

export const uploadStateVariablesFailure = createAction(
  '[file upload] uploadStateVariablesFailure',
  props<{ error: Error }>()
);

export const uploadStateVariablesSuccess = createAction(
  '[file upload] uploadStateVariablesSuccess',
  props<{ stateVariableMap: StateVariableMap }>()
);
