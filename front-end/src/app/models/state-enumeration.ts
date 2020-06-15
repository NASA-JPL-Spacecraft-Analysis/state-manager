import { StringTMap } from './string-t-map';

export interface StateEnumeration {
  id: number;
  stateId: number;
  label: string;
  value: number;
}

export type StateEnumerationMap = StringTMap<StateEnumeration[]>;
