import { InformationTypeEnum, InformationTypes, InformationTypesMap } from '../models';

export const mockInformationType: InformationTypes = {
  id: '1',
  identifier: 'ACTIVITY_TEST',
  displayName: 'Activity',
  description: 'Test activity',
  externalLink: '',
  informationType: InformationTypeEnum.Activity
};

export const mockInformationTypes: InformationTypes[] = [
  mockInformationType
];

export const mockInformationTypesMap: InformationTypesMap = new Map(
  [
    [1, {
      ['1']: {
        ...mockInformationType
      }
    }]
  ]
);
