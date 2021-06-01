import { InformationType, InformationTypeMap } from '../models';

export const mockInformationType: InformationType = {
  collectionId: '1',
  displayName: 'Goal',
  description: 'Test goal',
  editable: true,
  externalLink: '',
  id: '1',
  identifier: 'GOAL_TEST',
  type: 'goal'
};

export const mockInformationTypes: InformationType[] = [
  mockInformationType
];

export const mockInformationTypeMap: InformationTypeMap = {
  ['1']: {
    ...mockInformationType
  }
};
