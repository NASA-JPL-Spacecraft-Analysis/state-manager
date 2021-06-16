import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ConstraintState } from '../reducers/constraint.reducer';

export const getConstraintState = createFeatureSelector<ConstraintState>('constraints');

export const getConstraintHistory = createSelector(
  getConstraintState,
  (state: ConstraintState) => state.constraintHistory
);

export const getConstraintIdentifierMap = createSelector(
  getConstraintState,
  (state: ConstraintState) => state.constraintIdentifierMap
);

export const getConstraintMap = createSelector(
  getConstraintState,
  (state: ConstraintState) => state.constraintMap
);

export const getConstraints = createSelector(
  getConstraintState,
  (state: ConstraintState) => 
    state.constraintMap ? Object.values(state.constraintMap) : undefined
);

export const getSelectedConstraint = createSelector(
  getConstraintState,
  (state: ConstraintState) => 
    state.selectedConstraintId ? state.constraintMap[state.selectedConstraintId] : undefined
);
