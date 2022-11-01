import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Group } from '../models';

import { GroupState } from '../reducers/group.reducer';

export const getGroupState = createFeatureSelector<GroupState>('groups');

export const getGroupIdentifierMap = createSelector(
  getGroupState,
  (state: GroupState) => state.groupIdentifierMap
);

export const getGroups = createSelector(
  getGroupState,
  (state: GroupState) => state.groups
);

export const getGroupMap = createSelector(
  getGroups,
  (groups: Group[]) => {
    const groupMap: Record<string, Group> = {};

    for (const group of groups) {
      groupMap[group.id] = group;
    }

    return groupMap;
  }
);

export const getSelectedGroup = createSelector(
  getGroupState,
  (state: GroupState) => state.selectedGroup
);
