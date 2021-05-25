import { Constraint } from '../constraint';
import { Response } from './response';

export type ConstraintResponse = Response & { constraint: Constraint };
