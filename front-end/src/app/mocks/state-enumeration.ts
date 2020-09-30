import { StateEnumerationMap, StateEnumeration, State } from '../models';

export const mockStates: State[] = [
  {
    id: 1,
    identifier: 'TEST_STATE',
    displayName: 'Test State',
    type: 'test state type',
    units: 'test state units',
    source: 'test state source',
    subsystem: 'test state subsystem',
    description: 'Test state description.'
  }
];

export const mockStateEnumerationMap: StateEnumerationMap = {
  [1]: [
    {
      id: 1,
      stateId: 1,
      label: 'test off',
      value: 0
    },
    {
      id: 2,
      stateId: 1,
      label: 'test on',
      value: 1
    }
  ]
};

export const mockStateEnumerationList: StateEnumeration[] = [
  {
    id: 1,
    stateId: 1,
    label: 'test off',
    value: 0
  },
  {
    id: 2,
    stateId: 1,
    label: 'test on',
    value: 1
  }
];
