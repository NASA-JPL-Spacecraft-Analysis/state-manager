import { StringTMap } from './string-t-map';

export interface StateEnumeration {
  id: number;
  stateId: number;
  label: string;
  value: number;
}

export interface StateEnumerationUpload {
  label: string;
  stateIdentifier: string;
  value: string;
}

export type StateEnumerationMap = StringTMap<StateEnumeration[]>;
