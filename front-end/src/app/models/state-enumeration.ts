import { StringTMap } from './string-t-map';

export interface StateEnumeration {
  id: string;
  stateId: string;
  label: string;
  value: string;
}

export interface StateEnumerationHistory extends StateEnumeration {
  stateEnumerationId: string;
  updated: Date;
}

export interface StateEnumerationUpload {
  label: string;
  stateIdentifier: string;
  value: string;
}

export type StateEnumerationMap = StringTMap<StateEnumeration[]>;
