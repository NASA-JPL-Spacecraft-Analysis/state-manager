import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';

import { FileUploadActions, GroupActions } from '../actions';
import { Group, IdentifierMap } from '../models';

export interface GroupState {
  groupIdentifierMap: IdentifierMap;
  groups: Group[];
  selectedGroup: Group;
};

export const initialState: GroupState = {
  groupIdentifierMap: undefined,
  groups: [],
  selectedGroup: undefined
};

export const reducer = createReducer(
  initialState,
  on(GroupActions.createGroupSuccess, (state, { group }) => ({
    ...state,
    groupIdentifierMap: {
      ...state.groupIdentifierMap,
      [group.identifier]: group.id
    },
    groups: [
      ...state.groups,
      group
    ],
    selectedGroup: group
  })),
  on(GroupActions.deleteGroupSuccess, (state, { id }) => {
    const groupIdentifierMap = {
      ...state.groupIdentifierMap
    };

    for (const identifier of Object.keys(groupIdentifierMap)) {
      if (groupIdentifierMap[identifier] === id) {
        delete groupIdentifierMap[identifier];
      }
    }

    return {
      ...state,
      groupIdentifierMap,
      groups: state.groups.filter((group) => group.id !== id),
      selectedGroup: undefined
    };
  }),
  on(GroupActions.setGroups, (state, { groups }) => {
    const groupIdentifierMap = {};

    for (const group of groups) {
      groupIdentifierMap[group.identifier] = group.id;
    }

    return {
      ...state,
      groupIdentifierMap,
      groups: [
        ...groups
      ]
    };
  }),
  on(GroupActions.setSelectedGroup, (state, { group }) => ({
    ...state,
    selectedGroup: group
  })),
  on(GroupActions.updateGroupSuccess, (state, { group }) => {
    const groups = [...state.groups];
    // Find the index of the group that was updated.
    const index = state.groups.map((g) => g.id).indexOf(group.id);

    groups.splice(index, 1, group);

    const groupIdentifierMap = {
      ...state.groupIdentifierMap
    };

    for (const identifier of Object.keys(groupIdentifierMap)) {
      // Remove the old identifier from our map
      if (groupIdentifierMap[identifier] === group.id) {
        delete groupIdentifierMap[identifier];
      }
    }

    return {
      ...state,
      groupIdentifierMap: {
        ...groupIdentifierMap,
        [group.identifier]: group.id
      },
      ...groups,
      selectedGroup: group,
    };
  }),
  on(FileUploadActions.uploadGroupMappingsSuccess, (state, { groupMappings }) => {
    const groups = cloneDeep(state.groups);
    const groupIdentifierMap = {};

    for (const group of groups) {
      groupIdentifierMap[group.identifier] = group.id;

      for (const groupMapping of groupMappings) {
        if (group.id === groupMapping.groupId) {
          group.groupMappings.push(groupMapping);
        }
      }
    }

    return {
      ...state,
      groupIdentifierMap: {
        ...state.groupIdentifierMap,
        ...groupIdentifierMap
      },
      groups: [
        ...groups
      ]
    };
  }),
  on(FileUploadActions.uploadGroupsSuccess, (state, { groups }) => {
    const groupIdentifierMap = {};

    for (const group of groups) {
      groupIdentifierMap[group.identifier] = group.id;
    }

    return {
      ...state,
      groupIdentifierMap: {
        ...state.groupIdentifierMap,
        ...groupIdentifierMap
      },
      groups: [
        ...state.groups,
        ...groups
      ]
    };
  })
);
