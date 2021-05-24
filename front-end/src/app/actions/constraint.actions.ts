import { createAction, props } from '@ngrx/store';

import { Constraint } from '../models';

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
  props<{ constraint: Constraint }>()
);
