import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GroupState } from '../reducers/group.reducer';

export const getGroupState = createFeatureSelector<GroupState>('groups');

export const getGroupIdentifierMap = createSelector(
  getGroupState,
  (state: GroupState) => state.groupIdentifierMap
);

export const getGroupMap = createSelector(
  getGroupState,
  (state: GroupState) => state.groupMap
);

export const getGroups = createSelector(
  getGroupState,
  (state: GroupState) => state.groups
);

export const getSelectedGroup = createSelector(
  getGroupState,
  (state: GroupState) => state.selectedGroup
);
