import { Relationship, RelationshipHistory, RelationshipMap } from '../models';

export const mockRelationship: Relationship = {
  id: '1',
  displayName: 'Test relationship name',
  description: 'Test relationship description',
  subjectType: 'informationType',
  targetType: 'informationType',
  subjectTypeId: '1',
  targetTypeId: '2'
};

export const mockRelationships: Relationship[] = [
  mockRelationship
];

export const mockRelationshipsMap: RelationshipMap = {
  [1]: mockRelationship
};

export const mockRelationshipHistory: RelationshipHistory[] = [
  {
    ...mockRelationship,
    relationshipId: '1',
    updated: new Date()
  }
];
