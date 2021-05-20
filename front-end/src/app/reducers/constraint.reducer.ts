import { createReducer } from '@ngrx/store';

import { Constraint } from '../models';

export interface ConstraintState {
  selectedConstraint: Constraint;
}

export const initialState: ConstraintState = {
  selectedConstraint: undefined
};

export const reducer = createReducer(
  initialState,
);
