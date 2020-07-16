import { StateMap } from '../models';

export const mockStateIdentifierMap: Map<string, number> = new Map([
  ['TEST', 1],
  ['TEST 1', 2],
]);

export const mockStateMap: StateMap = {
  [1]: {
    id: 1,
    identifier: 'TEST',
    displayName: 'Test',
    type: 'test string',
    units: 'na',
    source: 'na',
    subsystem: 'na',
    description: 'This is a test string.'
  },
  [2]: {
    id: 2,
    identifier: 'TEST_1',
    displayName: 'Test 1',
    type: 'test string 1',
    units: 'na',
    source: 'na',
    subsystem: 'na',
    description: 'This is test string 1.'
  }
};
