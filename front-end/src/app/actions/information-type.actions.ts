import { createAction, props } from '@ngrx/store';

import { InformationType } from '../models';

export const clearInformationTypes = createAction('[information types] clearInformationTypes');

export const fetchInformationTypesFailure = createAction(
  '[information types] fetchInformationTypesFailure',
  props<{ error: Error }>()
);

export const setInformationTypes = createAction(
  '[information types] setInformationTypes',
  props<{ informationTypes: InformationType[] }>()
);
