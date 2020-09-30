import { InformationTypeEnum, Relationship, RelationshipHistory, RelationshipMap } from '../models';

const relationship: Relationship = {
  id: 1,
  displayName: 'Test relationship name',
  description: 'Test relationship description',
  subjectType: InformationTypeEnum.Activity,
  targetType: InformationTypeEnum.Activity,
  subjectTypeId: 1,
  targetTypeId: 2
};

export const mockRelationships: Relationship[] = [
  relationship
];

export const mockRelationshipsMap: RelationshipMap = {
  [1]: relationship
};

export const mockRelationshipHistory: RelationshipHistory[] = [
  {
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
];
