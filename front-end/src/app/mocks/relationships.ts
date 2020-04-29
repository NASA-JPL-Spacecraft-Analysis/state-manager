import { RelationshipMap, InformationTypeEnum } from '../models';

export const relationshipHistoryMap: RelationshipMap = {
  [1]: {
    id: 1,
    relationshipId: 1,
    displayName: 'Test relationship name',
    description: 'Test relationship description',
    subjectType: InformationTypeEnum.Activity,
    targetType: InformationTypeEnum.Activity,
    subjectTypeId: 1,
    targetTypeId: 2,
    updated: new Date()
  }
};

export const relationshipMap: RelationshipMap = {
  [1]: {
    id: 1,
    displayName: 'Test relationship name',
    description: 'Test relationship description',
    subjectType: InformationTypeEnum.Activity,
    targetType: InformationTypeEnum.Activity,
    subjectTypeId: 1,
    targetTypeId: 2
  }
};
