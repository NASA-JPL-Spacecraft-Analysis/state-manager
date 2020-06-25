import { StateEnumerationMap, StateEnumeration } from '../models';

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
