import { createReducer, on } from '@ngrx/store';

import { FileUploadActions, GroupActions } from '../actions';
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
  on(GroupActions.createGroupSuccess, (state, { group }) => ({
    ...state,
    groups: [
      ...state.groups,
      group
    ],
    selectedGroup: group
  })),
  on(GroupActions.setGroups, (state, { groups }) => ({
    ...state,
    groups: [
      ...groups
    ]
  })),
  on(GroupActions.setSelectedGroup, (state, { group }) => ({
    ...state,
    selectedGroup: group
  })),
  on(GroupActions.updateGroupSuccess, (state, { group }) => {
    let index = 0;

    for (const existingGroup of state.groups) {
      if (existingGroup.id === group.id) {
        break;
      }

      index++;
    }

    const groups = [ ...state.groups ];

    groups.splice(index, 1, group);

    return {
      ...state,
      groups: [
        ...groups
      ],
      selectedGroup: group,
    };
  }),
  on(FileUploadActions.uploadGroupsSuccess, (state, { groups }) => ({
    ...state,
    groups: [
      ...state.groups,
      ...groups
    ]
  }))
);
