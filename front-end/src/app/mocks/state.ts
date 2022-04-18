import { IdentifierMap, State, StateMap } from '../models';

export const mockStateOne: State = {
  channelId: '',
  collectionId: '1',
  dataType: 'data type',
  description: 'This is a test string.',
  displayName: 'Test',
  editable: true,
  enumerations: [],
  externalLink: '',
  id: '1',
  identifier: 'TEST',
  restricted: false,
  source: 'na',
  subsystem: 'na',
  type: 'test string',
  units: 'na',
  version: ''
};

export const mockStateTwo: State = {
  channelId: '',
  collectionId: '1',
  dataType: 'data type',
  description: 'This is test string 1.',
  displayName: 'Test 1',
  editable: true,
  enumerations: [],
  externalLink: '',
  id: '2',
  identifier: 'TEST_1',
  restricted: false,
  source: 'na',
  subsystem: 'na',
  type: 'test string 1',
  units: 'na',
  version: ''
};

export const mockStateIdentifierMap: IdentifierMap = {
  [mockStateOne.identifier]: [
    {
      id: mockStateOne.id,
      type: mockStateOne.type
    }
  ],
  [mockStateTwo.identifier]: [
    {
      id: mockStateTwo.id,
      type: mockStateTwo.type
    }
  ]
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
