import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';

import { FileUploadActions, GroupActions } from '../actions';
import { Group } from '../models';

export interface GroupState {
  groups: Group[];
  selectedGroup: Group;
};

export const initialState: GroupState = {
  groups: [],
  selectedGroup: undefined
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
  on(GroupActions.deleteGroupSuccess, (state, { id }) => ({
    ...state,
    groups: state.groups.filter((group) => group.id !== id),
    selectedGroup: undefined
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
    const groups = [...state.groups];
    // Find the index of the group that was updated.
    const index = state.groups.map((g) => g.id).indexOf(group.id);

    groups.splice(index, 1, group);

    return {
      ...state,
      groups: [
        ...groups,
      ],
      selectedGroup: group,
    };
  }),
  on(FileUploadActions.uploadGroupMappingsSuccess, (state, { groupMappings }) => {
    const groups = cloneDeep(state.groups);

    for (const group of groups) {
      for (const groupMapping of groupMappings) {
        if (group.id === groupMapping.groupId) {
          group.groupMappings.push(groupMapping);
        }
      }
    }

    return {
      ...state,
      groups: [
        ...state.groups,
        ...groups
      ]
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
