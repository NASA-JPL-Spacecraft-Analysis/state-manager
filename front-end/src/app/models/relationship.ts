import { StateVariable } from './state-variable';
import { StringTMap } from './string-t-map';

// TODO: Figure out final types.
export interface Relationship {
  id: number;
  displayName: string;
  description: string;
  subjectStateId: number;
  targetStateId: number;
  type: string; // Enum?
}

export type RelationshipMap = StringTMap<Relationship>;
