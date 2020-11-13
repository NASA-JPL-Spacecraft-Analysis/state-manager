import { StateEnumerationMap, StateEnumeration, StateEnumerationUpload } from '../models';

export const mockStateEnumerationOne: StateEnumeration = {
  id: 1,
  stateId: 1,
  label: 'test off',
  value: 0
};

export const mockStateEnumerationUploadOne: StateEnumerationUpload = {
  label: 'test off',
  stateIdentifier: 'TEST_STATE_IDENTIFIER',
  value: '0'
};

export const mockStateEnumerationTwo: StateEnumeration = {
  id: 2,
  stateId: 1,
  label: 'test on',
  value: 1
};

export const mockStateEnumerationUploadTwo: StateEnumerationUpload = {
  label: 'test off',
  stateIdentifier: 'TEST_STATE_IDENTIFIER',
  value: '0'
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

export const mockStateEnumerationUploads: StateEnumerationUpload[] = [
  mockStateEnumerationUploadOne,
  mockStateEnumerationUploadTwo
];
