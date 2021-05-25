import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ConstraintState } from '../reducers/constraint.reducer';

export const getConstraintState = createFeatureSelector<ConstraintState>('constraints');

export const getConstraintIdentifierMap = createSelector(
  getConstraintState,
  (state: ConstraintState) => state.constraintIdentifierMap
);

export const getConstraintMap = createSelector(
  getConstraintState,
  (state: ConstraintState) => state.constraintMap
);

export const getSelectedConstraint = createSelector(
  getConstraintState,
  (state: ConstraintState) => 
    state.selectedConstraintId ? state.constraintMap[state.selectedConstraintId] : undefined
);
