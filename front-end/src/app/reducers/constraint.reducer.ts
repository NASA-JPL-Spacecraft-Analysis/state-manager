import { createReducer, on } from '@ngrx/store';

import { ConstraintActions } from '../actions';
import { Constraint, ConstraintMap } from '../models';

export interface ConstraintState {
  constraintMap: ConstraintMap,
  selectedConstraint: Constraint;
}

export const initialState: ConstraintState = {
  constraintMap: undefined,
  selectedConstraint: undefined
};

export const reducer = createReducer(
  initialState,
  on(ConstraintActions.setConstraints, (state, { constraints }) => {
    const constraintMap = {};

    for (const constraint of constraints) {
      constraintMap[constraint.id] = constraint;
    }

    return {
      ...state,
      constraintMap
    };
  }),
  on(ConstraintActions.setSelectedConstraint, (state, { constraint }) => ({
    ...state,
    selectedConstraint: constraint
  }))
);
