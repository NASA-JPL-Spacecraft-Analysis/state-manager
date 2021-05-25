import { createReducer, on } from '@ngrx/store';

import { ConstraintActions } from '../actions';
import { ConstraintMap, IdentifierMap } from '../models';

export interface ConstraintState {
  constraintIdentifierMap: IdentifierMap,
  constraintMap: ConstraintMap,
  selectedConstraintId: string
}

export const initialState: ConstraintState = {
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
    selectedConstraintId: undefined
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
  })
);
