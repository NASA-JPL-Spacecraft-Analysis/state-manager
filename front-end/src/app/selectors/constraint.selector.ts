import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ConstraintState } from '../reducers/constraint.reducer';

export const getConstraintState = createFeatureSelector<ConstraintState>('constraints');

export const getConstraintMap = createSelector(
  getConstraintState,
  (state: ConstraintState) => state.constraintMap
);
