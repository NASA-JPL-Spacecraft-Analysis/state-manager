import { createAction, props } from '@ngrx/store';

import { StateVariableMap, InformationTypesMap, RelationshipMap, StateEnumerationMap } from '../models';

export const uploadEnumerations = createAction(
  '[file upload] uploadEnumerations',
  props<{ file: File, fileType: string }>()
);

export const uploadEnumerationsFailure = createAction(
  '[file upload] uploadEnumerationsFailure',
  props<{ error: Error }>()
);

export const uploadEnumerationsSuccess = createAction(
  '[file upload] uploadEnumerationsSuccess',
  props<{ enumerations: StateEnumerationMap }>()
);

export const uploadInformationTypes = createAction(
  '[file upload] uploadInfomrationTypes',
  props<{ file: File, fileType: string }>()
);

export const uploadInformationTypesFailure = createAction(
  '[file upload] uploadInformationTypesFailure',
  props<{ error: Error }>()
);

export const uploadInformationTypesSuccess = createAction(
  '[file upload] uploadInformationTypesSuccess',
  props<{ informationTypes: InformationTypesMap }>()
);

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
