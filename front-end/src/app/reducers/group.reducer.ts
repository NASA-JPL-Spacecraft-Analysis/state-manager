import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';

import { FileUploadActions, GroupActions } from '../actions';
import { Group, GroupMap, IdentifierMap } from '../models';

export interface GroupState {
  groupIdentifierMap: IdentifierMap;
  groupMap: GroupMap;
  groups: Group[];
  selectedGroup: Group;
};

export const initialState: GroupState = {
  groupIdentifierMap: undefined,
  groupMap: undefined,
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
    groupMap: {
      ...state.groupMap,
      [group.id]: {
        ...group
      }
    },
    groups: [
      ...state.groups,
      group
    ],
    selectedGroup: group
  })),
  on(GroupActions.deleteGroupSuccess, (state, { id }) => {
    const groupIdentifierMap = state.groupIdentifierMap;
    const groupMap = state.groupMap;

    for (const identifier of Object.keys(groupIdentifierMap)) {
      if (groupIdentifierMap[identifier] = id) {
        delete groupIdentifierMap[identifier];
      }
    }

    delete groupMap[id];

    return {
      ...state,
      groupIdentifierMap,
      groupMap,
      groups: state.groups.filter((group) => group.id !== id),
      selectedGroup: undefined
    };
  }),
  on(GroupActions.setGroups, (state, { groups }) => {
    const groupIdentifierMap = {};
    const groupMap = {};
    
    for (const group of groups) {
      groupIdentifierMap[group.identifier] = group.id;
      groupMap[group.id] = group;
    }

    return {
      ...state,
      groupIdentifierMap,
      groupMap,
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
    const groups = [ ...state.groups ];
    // Find the index of the group that was updated.
    const index = state.groups.map((group) => {
      return group.id;
    }).indexOf(group.id);

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
      groupMap: {
        ...state.groupMap,
        [group.id]: {
          ...group
        }
      },
      groups: [
        ...groups
      ],
      selectedGroup: group,
    };
  }),
  on(FileUploadActions.uploadGroupMappingsSuccess, (state, { groupMappings }) => {
    const groups = cloneDeep(state.groups);
    const groupIdentifierMap = {};
    const groupMap = {};
    
    for (const group of groups) {
      groupIdentifierMap[group.identifier] = group.id;
      groupMap[group.id] = group;

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
      groupMap: {
        ...state.groupMap,
        ...groupMap
      },
      groups: [
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
