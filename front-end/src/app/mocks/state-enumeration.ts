import { StateEnumerationMap, StateEnumeration } from '../models';

export const stateEnumerationMap: StateEnumerationMap = {
  [1]: [
    {
      id: 1,
      stateVariableId: 1,
      label: 'test off',
      value: 0
    },
    {
      id: 2,
      stateVariableId: 1,
      label: 'test on',
      value: 1
    }
  ]
};

export const stateEnumerationList: StateEnumeration[] = [
  {
    id: 1,
    stateVariableId: 1,
    label: 'test off',
    value: 0
  },
  {
    id: 2,
    stateVariableId: 1,
    label: 'test on',
    value: 1
  }
];
