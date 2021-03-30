import { createReducer, on } from '@ngrx/store';

import { GroupActions } from '../actions';
import { Group } from '../models';

export interface GroupState {
  groups: Group[];
  selectedGroup: Group;
};

export const initialState: GroupState = {
  groups: [],
  selectedGroup: null
};

export const reducer = createReducer(
  initialState,
  on(GroupActions.setGroups, (state, { groups }) => ({
    ...state,
    groups: [
      ...groups
    ]
  })),
  on(GroupActions.setSelectedGroup, (state, { group }) => ({
    ...state,
    selectedGroup: group
  }))
);
