import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Group, IdentifierMap } from '../models';
import { GroupState } from '../reducers/group.reducer';

export const getGroupState = createFeatureSelector<GroupState>('groups');

export const getGroups = createSelector(
  getGroupState,
  (state: GroupState) => state.groups
);

export const getGroupIdentifierMap = createSelector(
  getGroups,
  (groups: Group[]) => {
    const groupIdentifierMap: IdentifierMap = {};

    for (const group of groups) {
      groupIdentifierMap[group.identifier] = [{
        id: group.id,
        type: 'group'
      }];
    }

    return groupIdentifierMap;
  }
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
