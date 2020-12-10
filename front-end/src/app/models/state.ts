import { StateEnumeration } from './state-enumeration';
import { StringTMap } from './string-t-map';

export interface State {
  description: string;
  displayName: string;
  enumerations: StateEnumeration[];
  id: string;
  identifier: string;
  source: string; // enum?
  subsystem: string;
  type: string; // enum?
  units: string; // enum?
}

export interface StateHistory extends State {
  stateId: string;
  updated: Date;
}

export type StateMap = StringTMap<State>;
