import { IdentifierType } from './identifier-type';
import { StringTMap } from './string-t-map';

export interface Constraint extends IdentifierType {
  description: string;
}

export interface ConstraintHistory extends Constraint {
  constraintId: string;
  updated: Date;
}

export type ConstraintMap = StringTMap<Constraint>;

export const constraintTypes: string[] = [
  'flight_rule_check',
  'downlink_rule_check',
  'channel_alarm'
];
