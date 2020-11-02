import { InformationTypeEnum, InformationTypesMap } from '../models';

export const mockInformationTypesMap: InformationTypesMap = new Map(
  [
    [1, {
      [1]: {
        id: 1,
        identifier: 'ACTIVITY_TEST',
        displayName: 'Activity',
        description: 'Test activity',
        externalLink: '',
        type: InformationTypeEnum.Activity
      }
    }]
  ]
);
