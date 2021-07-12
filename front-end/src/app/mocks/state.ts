import { IdentifierMap, State, StateMap } from '../models';

export const mockStateOne: State = {
  id: '1',
  identifier: 'TEST',
  displayName: 'Test',
  type: 'test string',
  units: 'na',
  source: 'na',
  subsystem: 'na',
  description: 'This is a test string.',
  enumerations: []
};

export const mockStateTwo: State = {
  id: '2',
  identifier: 'TEST_1',
  displayName: 'Test 1',
  type: 'test string 1',
  units: 'na',
  source: 'na',
  subsystem: 'na',
  description: 'This is test string 1.',
  enumerations: []
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
