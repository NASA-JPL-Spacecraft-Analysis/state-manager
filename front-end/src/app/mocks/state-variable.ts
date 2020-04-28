import { StateVariableMap } from '../models';

export const identifierList: string[] = [
  'TEST',
  'TEST 1'
];

export const identifierSet: Set<string> = new Set([
  'TEST',
  'TEST 1'
]);

export const stateVariableMap: StateVariableMap = {
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
