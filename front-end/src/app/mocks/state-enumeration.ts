import { StateEnumerationMap, StateEnumeration } from '../models';

export const mockStateEnumerationOne: StateEnumeration = {
  id: 1,
  stateId: 1,
  label: 'test off',
  value: 0
};

export const mockStateEnumerationTwo: StateEnumeration = {
  id: 2,
  stateId: 1,
  label: 'test on',
  value: 1
};

export const mockStateEnumerationMap: StateEnumerationMap = {
  [mockStateEnumerationOne.id]: [
    {
      ...mockStateEnumerationOne
    }
  ],
  [mockStateEnumerationTwo.id]: [
    {
      ...mockStateEnumerationTwo
    }
  ]
};

export const mockStateEnumerations: StateEnumeration[] = [
  mockStateEnumerationOne,
  mockStateEnumerationTwo
];
