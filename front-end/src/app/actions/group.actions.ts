import { createAction, props } from '@ngrx/store';

import { Group } from '../models';

export const createGroup = createAction(
  '[group] createGroup',
  props<{ collectionId: string, group: Group }>()
);

export const createGroupFailure = createAction(
  '[group] createGroupFailure',
  props<{ error: Error }>()
);

export const createGroupSuccess = createAction(
  '[group] createGroupSuccess',
  props<{ group: Group }>()
);

export const fetchGroupsFailure = createAction(
  '[group] fetchGroupsFailure',
  props<{ error: Error }>()
);

export const deleteGroup = createAction(
  '[group] deleteGroup',
  props<{ group: Group }>()
);

export const deleteGroupFailure = createAction(
  '[group] deleteGroupFailure',
  props<{ error: Error }>()
);

export const deleteGroupSuccess = createAction(
  '[group] deleteGroupSuccess',
  props<{ id: string }>()
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
  props<{ collectionId: string, group: Group }>()
);

export const updateGroupFailure = createAction(
  '[group] updateGroupFailure',
  props<{ error: Error }>()
);

export const updateGroupSuccess = createAction(
  '[group] updateGroupSuccess',
  props<{ group: Group }>()
);
