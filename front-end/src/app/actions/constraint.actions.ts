import { createAction, props } from '@ngrx/store';

import { Constraint } from '../models';

export const createConstraint = createAction(
  '[constraint] createConstraint',
  props<{ constraint: Constraint }>()
);

export const createConstraintFailure = createAction(
  '[constraint] createConstraintFailure',
  props<{ error: Error }>()
);

export const createConstraintSuccess = createAction(
  '[constraint] createConstraintSuccess',
  props<{ constraint: Constraint }>()
);

export const fetchConstraintsFailure = createAction(
  '[constraint] fetchConstraintsFailure',
  props<{ error: Error }>()
);

export const setConstraints = createAction(
  '[constraint] setConstraints',
  props<{ constraints: Constraint[] }>()
);

export const setSelectedConstraint = createAction(
  '[constraint] setSelectedConstraint',
  props<{ id: string }>()
);

export const updateConstraint = createAction(
  '[constraint] updateConstraint',
  props<{ constraint: Constraint }>()
);

export const updateConstraintFailure = createAction(
  '[constraint] updateConstraintFailure',
  props<{ error: Error }>()
);

export const updateConstraintSuccess = createAction(
  '[constraint] updateConstraintSuccess',
  props<{ constraint: Constraint }>()
);
