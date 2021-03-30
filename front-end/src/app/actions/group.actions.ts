import { createAction, props } from '@ngrx/store';

import { Group } from '../models';

export const createGroup = createAction(
  '[group] createGroup',
  props<{ collectionId: string, group: Group }>()
);

export const fetchGroupsFailure = createAction(
  '[group] fetchGroupsFailure',
  props<{ error: Error }>()
);

export const setGroups = createAction(
  '[group] setGroups',
  props<{ groups: Group[] }>()
);

export const setSelectedGroup = createAction(
  '[group] setSelectedGroup',
  props<{ group: Group }>()
);

export const updateGroup = createAction(
  '[group] updateGroup',
  props<{ group: Group }>()
);
