import { Constraint, ConstraintHistory, IdentifierMap } from '../models';

export const mockConstraint: Constraint = {
  collectionId: '1',
  description: 'Mock constraint description',
  displayName: 'Mock Constraint',
  editable: true,
  externalLink: 'http://mock-constraint.com',
  id: '1',
  identifier: 'MOCK_CONSTRAINT',
  type: 'flight_rule_check'
};

export const mockConstraintHistory: ConstraintHistory[] = [
  {
    ...mockConstraint,
    constraintId: mockConstraint.id,
    updated: new Date()
  }
];

export const mockConstraints: Constraint[] = [
  {
    ...mockConstraint
  }
];

export const mockConstraintIdentifierMap: IdentifierMap = {
  [mockConstraint.identifier]: mockConstraint.id
};
