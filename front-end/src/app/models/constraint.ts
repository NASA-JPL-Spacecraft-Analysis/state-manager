import { IdentifierType } from './identifier-type';

export interface Constraint extends IdentifierType {
  description: string;
}

export interface ConstraintHistory extends Constraint {
  constraintId: string;
  updated: Date;
}

export const constraintTypes: string[] = [
  'flight_rule_check',
  'downlink_rule_check',
  'channel_alarm'
];
