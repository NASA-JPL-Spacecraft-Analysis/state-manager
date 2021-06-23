import { createReducer, on } from '@ngrx/store';

import { ConstraintActions, FileUploadActions } from '../actions';
import { Constraint, ConstraintMap, IdentifierMap } from '../models';

export interface ConstraintState {
  constraintHistory: Constraint[];
  constraintIdentifierMap: IdentifierMap,
  constraintMap: ConstraintMap,
  selectedConstraintId: string
}

export const initialState: ConstraintState = {
  constraintHistory: undefined,
  constraintIdentifierMap: undefined,
  constraintMap: undefined,
  selectedConstraintId: undefined
};

export const reducer = createReducer(
  initialState,
  on(ConstraintActions.createConstraintSuccess, (state, { constraint }) => ({
    ...state,
    constraintIdentifierMap: {
      ...state.constraintIdentifierMap,
      [constraint.identifier]: constraint.id
    },
    constraintMap: {
      ...state.constraintMap,
      [constraint.id]: {
        ...constraint
      }
    },
    selectedConstraintId: constraint.id
  })),
  on(ConstraintActions.setConstraintHistory, (state, { constraintHistory }) => ({
    ...state,
    constraintHistory
  })),
  on(ConstraintActions.setConstraints, (state, { constraints }) => {
    const constraintIdentifierMap = {};
    const constraintMap = {};

    for (const constraint of constraints) {
      constraintIdentifierMap[constraint.identifier] = constraint.id;
      constraintMap[constraint.id] = constraint;
    }

    return {
      ...state,
      constraintIdentifierMap,
      constraintMap
    };
  }),
  on(ConstraintActions.setSelectedConstraint, (state, { id }) => ({
    ...state,
    selectedConstraintId: id
  })),
  on(ConstraintActions.updateConstraintSuccess, (state, { constraint }) => {
    const constraintIdentifierMap = {
      ...state.constraintIdentifierMap
    };

    for (const identifier of Object.keys(constraintIdentifierMap)) {
      // Remove the old identifier from our map
      if (constraintIdentifierMap[identifier] === constraint.id) {
        delete constraintIdentifierMap[identifier];
      }
    }

    return {
      ...state,
      constraintIdentifierMap: {
        ...constraintIdentifierMap,
        [constraint.identifier]: constraint.id
      },
      constraintMap: {
        ...state.constraintMap,
        [constraint.id]: {
          ...constraint
        }
      }
    };
  }),
  on(FileUploadActions.uploadConstraintsSuccess, (state, { constraints }) => {
    const constraintIdentifierMap = {};
    const constraintMap = {};

    for (const constraint of constraints) {
      constraintIdentifierMap[constraint.identifier] = constraint.id;
      constraintMap[constraint.id] = constraint;
    }

    return {
      ...state,
      constraintIdentifierMap: {
        ...state.constraintIdentifierMap,
        ...constraintIdentifierMap
      },
      constraintMap: {
        ...state.constraintMap,
        ...constraintMap
      }
    };
  })
);
