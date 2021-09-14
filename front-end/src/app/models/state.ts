import { IdentifierType } from './identifier-type';
import { StateEnumeration } from './state-enumeration';
import { StringTMap } from './string-t-map';

export interface State extends IdentifierType {
  dataType: string;
  enumerations: StateEnumeration[];
  source: string;
  subsystem: string;
  units: string;
}

export interface StateHistory extends State {
  stateId: string;
  updated: Date;
}

export type StateMap = StringTMap<State>;

export const stateTypes: string[] = [
  'alarm_limit',
  'channel',
  'fsw_parameter',
  'model_input',
  'predict',
  'trend',
  'user'
];
