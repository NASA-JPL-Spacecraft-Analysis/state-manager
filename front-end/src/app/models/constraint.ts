import { IdentifierType } from './identifier-type';
import { StringTMap } from './string-t-map';

export interface Constraint extends IdentifierType {}

export interface ConstraintHistory extends Constraint {
  constraintId: string;
  updated: Date;
}

export type ConstraintMap = StringTMap<Constraint>;
