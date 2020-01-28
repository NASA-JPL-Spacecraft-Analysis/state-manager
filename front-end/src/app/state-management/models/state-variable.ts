import { StringTMap } from './string-t-map';

// TODO: Validate data types for this interface, some of these will become enums.
export interface StateVariable {
  id: number;
  identifier: string;
  displayName: string;
  type: string; // enum?
  units: string; // enum?
  source: string; // enum?
  description: string;
  enumerationIds: string[];
}

export type StateVariableMap = StringTMap<StateVariable>;
