import { createAction, props } from '@ngrx/store';

import { TestString } from '../models';

export const createNewData = createAction(
  '[data] create_new_data',
  props<{ data: string }>()
);

export const createTestStringSuccess = createAction(
  '[data] create_test_string_success',
  props<{ data: Array<TestString> }>()
);

export const createTestStringFailure = createAction(
  '[data] create_test_string_faiure',
  props<{ error: Error }>()
);

export const fetchDataFailure = createAction(
  '[data] fetch_data_failure',
  props<{ error: Error }>()
);

export const setData = createAction(
  '[data] set_data',
  props<{ data: Array<TestString> }>()
);
