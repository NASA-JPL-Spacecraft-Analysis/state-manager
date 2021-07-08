import { ConstraintActions, FileUploadActions } from '../actions';
import { mockConstraint, mockConstraintIdentifierMap, mockConstraintHistory, mockConstraints } from '../mocks';
import { ConstraintState, initialState, reducer } from './constraint.reducer';

describe('ConstraintReducer', () => {
  describe('createConstraintSuccess', () => {
    it('should add the new constraint to constraintIdentifierMap, constraintMap, and set the selected constraint id.', () => {
      const constraintState: ConstraintState = reducer(
        {
          ...initialState
        },
        ConstraintActions.createConstraintSuccess({
          constraint: mockConstraint
        })
      );

      expect(constraintState).toEqual({
        ...initialState,
        constraintIdentifierMap: {
          [mockConstraint.identifier]: mockConstraint.id
        },
        constraintMap: {
          [mockConstraint.id]: {
            ...mockConstraint
          }
        },
        selectedConstraintId: mockConstraint.id
      })
    });
  });

  describe('setConstraintHistory', () => {
    it('should set constraintHistory when it finishes loading', () => {
      const constraintState: ConstraintState = reducer(
        {
          ...initialState
        },
        ConstraintActions.setConstraintHistory({
          constraintHistory: mockConstraintHistory
        })
      );

      expect(constraintState).toEqual({
        ...initialState,
        constraintHistory: [
          ...mockConstraintHistory
        ]
      })
    });
  });

  describe('setConstraints', () => {
    it('should add the constraints to constraintIdentifierMap and constraintMap', () => {
      const constraintState: ConstraintState = reducer(
        {
          ...initialState
        },
        ConstraintActions.setConstraints({
          constraints: mockConstraints
        })
      );

      expect(constraintState).toEqual({
        ...initialState,
        constraintIdentifierMap: {
          [mockConstraint.identifier]: mockConstraint.id
        },
        constraintMap: {
          [mockConstraint.id]: {
            ...mockConstraint
          }
        }
      })
    });
  });

  describe('setSelectedConstraint', () => {
    it('should set the selected constraint', () => {
      const constraintState: ConstraintState = reducer(
        {
          ...initialState
        },
        ConstraintActions.setSelectedConstraint({
          id: mockConstraint.id
        })
      );

      expect(constraintState).toEqual({
        ...initialState,
        selectedConstraintId: mockConstraint.id
      })
    });
  });

  describe('updateConstraintSuccess', () => {
    it('should remove the old constraint identifier from constraintIdentifierMap and update the constraint in constraintMap', () => {
      const updatedMockConstraint = {
        ...mockConstraint,
        identifier: 'UPDATED_MOCK_CONSTRAINT'
      };

      const constraintState: ConstraintState = reducer(
        {
          ...initialState,
          constraintIdentifierMap: {
            ...mockConstraintIdentifierMap
          }
        },
        ConstraintActions.updateConstraintSuccess({
          constraint: updatedMockConstraint
        })
      );

      expect(constraintState).toEqual({
        ...initialState,
        constraintIdentifierMap: {
          [updatedMockConstraint.identifier]: updatedMockConstraint.id
        },
        constraintMap: {
          [mockConstraint.id]: {
            ...updatedMockConstraint
          }
        }
      })
    });
  });

  describe('uploadConstraintSuccess', () => {
    it('should add the new constraint to constraintIdentifierMap, constraintMap, and set the selected constraint id.', () => {
      const constraintState: ConstraintState = reducer(
        {
          ...initialState
        },
        FileUploadActions.uploadConstraintsSuccess({
          constraints: mockConstraints
        })
      );

      expect(constraintState).toEqual({
        ...initialState,
        constraintIdentifierMap: {
          [mockConstraint.identifier]: mockConstraint.id
        },
        constraintMap: {
          [mockConstraint.id]: {
            ...mockConstraint
          }
        }
      })
    });
  });
});
