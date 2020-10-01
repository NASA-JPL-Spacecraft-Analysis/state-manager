import { StateEnumeration } from './state-enumeration';
import { StringTMap } from './string-t-map';

export interface State {
  id: number;
  identifier: string;
  displayName: string;
  type: string; // enum?
  units: string; // enum?
  source: string; // enum?
  subsystem: string;
  description: string;
  enumerations: StateEnumeration[];
}

export interface StateHistory extends State {
  stateId: number;
  updated: Date;
}

export type StateMap = StringTMap<State>;
