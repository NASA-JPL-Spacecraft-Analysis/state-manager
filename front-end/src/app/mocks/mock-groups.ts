import { Group, GroupMapping } from './../models';

export const mockGroup1: Group = {
  collectionId: '1-collection',
  groupMappings: [],
  id: '1-Group',
  identifier: 'Test Group'
};

export const mockGroup2: Group = {
  collectionId: '1-collection',
  groupMappings: [],
  id: '2-Group',
  identifier: 'Test Group'
};

export const mockGroupMapping1: GroupMapping = {
  groupId: mockGroup1.id,
  id: '1-GroupMapping',
  item: undefined,
  itemId: undefined
};

export const mockGroupMappings: GroupMapping[] = [
  mockGroupMapping1
];

export const mockGroups: Group[] = [
  mockGroup1,
  mockGroup2
];
