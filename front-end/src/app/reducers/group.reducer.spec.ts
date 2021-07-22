import { FileUploadActions, GroupActions } from '../actions';
import { mockEvent1, mockGroup1, mockGroup2, mockGroupMapping1, mockGroupMappings, mockGroups } from '../mocks';
import { Group } from './../models';
import { GroupState, initialState, reducer } from './group.reducer';

describe('GroupReducer', () => {
  describe('createGroupSuccess', () => {
    it('should update the group list and set the selected group on createGroupSuccess', () => {
      const groupState: GroupState = reducer(
        { ...initialState },
        GroupActions.createGroupSuccess({
          group: mockGroup1
        })
      );

      expect(groupState).toEqual({
        ...initialState,
        groupIdentifierMap: {
          [mockGroup1.identifier]: mockGroup1.id
        },
        groupMap: {
          [mockGroup1.id]: mockGroup1
        },
        groups: [
          mockGroup1
        ],
        selectedGroup: mockGroup1
      });
    });
  });

  describe('deleteGroupSuccess', () => {
    it('should remove mockGroup1 from our group list and set undefined as the selected group when mockGroup1 is deleted', () => {
      const groupState: GroupState = reducer(
        {
          ...initialState,
          groups: mockGroups,
          selectedGroup: mockGroup1
        },
        GroupActions.deleteGroupSuccess({
          id: mockGroup1.id
        })
      );

      expect(groupState).toEqual({
        ...initialState,
        groups: [
          mockGroup2
        ],
        selectedGroup: undefined
      })
    });
  });

  describe('setGroups', () => {
    it('should update the group list on setGroups', () => {
      const groupState: GroupState = reducer(
        { ...initialState },
        GroupActions.setGroups({
          groups: mockGroups
        })
      );

      expect(groupState).toEqual({
        ...initialState,
        groupIdentifierMap: {
          [mockGroup1.identifier]: mockGroup1.id
        },
        groupMap: {
          [mockGroup1.id]: mockGroup1
        },
        groups: mockGroups
      });
    });
  });

  describe('setSelectedGroup', () => {
    it('should set the selected group on setSelectedGroup', () => {
      let groupState: GroupState = reducer(
        { ...initialState },
        GroupActions.setSelectedGroup({
          group: mockGroup1
        })
      );

      expect(groupState).toEqual({
        ...initialState,
        selectedGroup: mockGroup1
      });

      groupState = reducer(
        { ...initialState },
        GroupActions.setSelectedGroup({
          group: mockGroup2
        })
      );

      expect(groupState).toEqual({
        ...initialState,
        selectedGroup: mockGroup2
      });
    });
  });

  describe('updateGroupSuccess', () => {
    it('should update the group list and selected group on updateGroupSuccess', () => {
      let groupState: GroupState = reducer(
        {
          ...initialState,
          groups: [
            mockGroup1
          ]
        },
        GroupActions.updateGroupSuccess({
          group: mockGroup1
        })
      );

      expect(groupState).toEqual({
        ...initialState,
        groupIdentifierMap: {
          [mockGroup1.identifier]: mockGroup1.id
        },
        groupMap: {
          [mockGroup1.id]: mockGroup1
        },
        groups: [
          mockGroup1
        ],
        selectedGroup: mockGroup1
      });

      const updatedGroup: Group = {
        ...mockGroup1,
        identifier: 'Test Group 3',
        groupMappings: [
          {
            id: '1-group-mapping',
            item: {
              ...mockEvent1
            },
            itemId: ''
          }
        ]
      };

      groupState = reducer(
        { ...initialState },
        GroupActions.updateGroupSuccess({
          group: updatedGroup
        })
      );

      expect(groupState).toEqual({
        ...initialState,
        groupIdentifierMap: {
          [mockGroup1.identifier]: mockGroup1.id
        },
        groupMap: {
          [mockGroup1.id]: mockGroup1
        },
        groups: [
          updatedGroup
        ],
        selectedGroup: updatedGroup
      });
    });
  });

  describe('uploadGroupMappingsSuccess', () => {
    it('should', () => {
      const groupState: GroupState = reducer(
        {
          ...initialState,
          groups: mockGroups,
        },
        FileUploadActions.uploadGroupMappingsSuccess({
          groupMappings: mockGroupMappings
        })
      );

      expect(groupState).toEqual({
        ...initialState,
        groupIdentifierMap: {
          [mockGroup1.identifier]: mockGroup1.id
        },
        groupMap: {
          [mockGroup1.id]: mockGroup1
        },
        groups: [
          {
            ...mockGroup1,
            groupMappings: [
              {
                ...mockGroupMapping1
              }
            ]
          },
          {
            ...mockGroup2
          }
        ]
      })
    });
  });

  describe('uploadGroupsSuccess', () => {
    it('should populate the groups list with the 2 uploaded groups', () => {
      const groupState: GroupState = reducer(
        { ...initialState },
        FileUploadActions.uploadGroupsSuccess({
          groups: mockGroups
        })
      );

      expect(groupState).toEqual({
        ...initialState,
        groupIdentifierMap: {
          [mockGroup1.identifier]: mockGroup1.id
        },
        groupMap: {
          [mockGroup1.id]: mockGroup1
        },
        groups: [
          mockGroup1,
          mockGroup2
        ]
      })
    });
  });
})
