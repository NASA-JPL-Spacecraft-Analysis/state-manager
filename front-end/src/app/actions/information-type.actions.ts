import { createAction, props } from '@ngrx/store';

import { InformationType } from '../models';

export const fetchInformationTypesFailure = createAction(
  '[information types] fetchInformationTypesFailure',
  props<{ error: Error }>()
);

export const setInformationTypes = createAction(
  '[information types] setInformationTypes',
  props<{ informationTypes: InformationType[] }>()
);
