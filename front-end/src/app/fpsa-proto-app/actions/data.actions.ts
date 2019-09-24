import { createAction, props } from '@ngrx/store';

import { TestString } from '../models';

export const fetchDataFailure = createAction(
  '[data] fetch_data_failure',
  props<{ error: Error }>()
);

export const setData = createAction(
  '[data] set_data',
  props<{ data: Array<TestString> }>()
);
