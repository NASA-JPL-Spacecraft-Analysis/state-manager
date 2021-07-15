import { IdentifierMap, State, StateMap } from '../models';

export const mockStateOne: State = {
  collectionId: '1',
  dataType: 'data type',
  description: 'This is a test string.',
  displayName: 'Test',
  editable: true,
  enumerations: [],
  externalLink: '',
  id: '1',
  identifier: 'TEST',
  source: 'na',
  subsystem: 'na',
  type: 'test string',
  units: 'na'
};

export const mockStateTwo: State = {
  collectionId: '1',
  dataType: 'data type',
  description: 'This is test string 1.',
  displayName: 'Test 1',
  editable: true,
  enumerations: [],
  externalLink: '',
  id: '2',
  identifier: 'TEST_1',
  source: 'na',
  subsystem: 'na',
  type: 'test string 1',
  units: 'na'
};

export const mockStateIdentifierMap: IdentifierMap = {
  [mockStateOne.identifier]: mockStateOne.id,
  [mockStateTwo.identifier]: mockStateTwo.id
};

export const mockStates: State[] = [
  mockStateOne,
  mockStateTwo
];

export const mockStateMap: StateMap = {
  [1]: {
    ...mockStateOne
  },
  [2]: {
    ...mockStateTwo
  }
};
