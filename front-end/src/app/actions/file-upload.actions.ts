import { createAction, props } from '@ngrx/store';

import { StateVariableMap, InformationTypesMap, StateEnumerationMap } from '../models';

export const uploadEnumerations = createAction(
  '[state variable] uploadEnumerations',
  props<{ file: File, fileType: string }>()
);

export const uploadEnumerationsFailure = createAction(
  '[state variable] uploadEnumerationsFailure',
  props<{ error: Error }>()
);

export const uploadEnumerationsSuccess = createAction(
  '[state variable] uploadEnumerationsSuccess',
  props<{ enumerations: StateEnumerationMap }>()
);

export const uploadInformationTypes = createAction(
  '[state variable] uploadInfomrationTypes',
  props<{ file: File }>()
);

export const uploadInformationTypesFailure = createAction(
  '[state variable] uploadInformationTypesFailure',
  props<{ error: Error }>()
);

export const uploadInformationTypesSuccess = createAction(
  '[state variable] uploadInformationTypesSuccess',
  props<{ informationTypes: InformationTypesMap }>()
);

export const uploadStateVariablesFailure = createAction(
  '[state variable] uploadStateVariablesFailure',
  props<{ error: Error }>()
);

export const uploadStateVariablesSuccess = createAction(
  '[state variable] uploadStateVariablesSuccess',
  props<{ stateVariableMap: StateVariableMap }>()
);

export const uploadStateVariables = createAction(
  '[state variable] uploadStateVariables',
  props<{ file: File, fileType: string }>()
);
