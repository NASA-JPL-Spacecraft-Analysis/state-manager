import { StateEnumeration } from './state-enumeration';
import { StringTMap } from './string-t-map';

export interface State {
  dataType: string;
  description: string;
  displayName: string;
  enumerations: StateEnumeration[];
  externalLink: string;
  id: string;
  identifier: string;
  source: string;
  subsystem: string;
  type: string;
  units: string;
}

export interface StateHistory extends State {
  stateId: string;
  updated: Date;
}

export type StateMap = StringTMap<State>;
