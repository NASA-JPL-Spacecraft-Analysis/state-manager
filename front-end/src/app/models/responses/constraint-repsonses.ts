import { Constraint } from '../constraint';
import { Response } from './response';

export type ConstraintResponse = Response & { constraint: Constraint };

export type ConstraintsResponse = Response & { constraints: Constraint[] };
