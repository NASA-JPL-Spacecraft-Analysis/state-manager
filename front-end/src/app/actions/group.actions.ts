import { createAction, props } from '@ngrx/store';

import { Group } from '../models';

export const fetchGroupsFailure = createAction(
  '[group] fetchGroupsFailure',
  props<{ error: Error }>()
);

export const setGroups = createAction(
  '[group] setGroups',
  props<{ groups: Group[] }>()
);