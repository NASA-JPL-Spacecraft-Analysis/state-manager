import { GroupActions } from '../actions';
import { mockEvent1, mockGroup1, mockGroup2, mockGroups } from '../mocks';
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
        groups: [
          mockGroup1
        ],
        selectedGroup: mockGroup1
      });
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
        groups: [
          mockGroup1
        ],
        selectedGroup: mockGroup1
      });

      const updatedGroup: Group = {
        ...mockGroup1,
        name: 'Test Group 3',
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
        groups: [
          updatedGroup
        ],
        selectedGroup: updatedGroup
      });
    });
  });
})
