import { createAction, props } from '@ngrx/store';

import { InformationTypes } from '../models';

export const fetchInformationTypesFailure = createAction(
  '[information types] fetchInformationTypesFailure',
  props<{ error: Error }>()
);

export const setInformationTypes = createAction(
  '[information types] setInformationTypes',
  props<{ informationTypes: InformationTypes[] }>()
);
