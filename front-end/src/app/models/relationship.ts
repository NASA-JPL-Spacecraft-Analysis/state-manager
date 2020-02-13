import { StateVariable } from './state-variable';
import { StringTMap } from './string-t-map';

// TODO: Figure out final types.
export interface Relationship {
  displayName: string;
  description: string;
  subjectStates: StateVariable[];
  targetStates: StateVariable[];
  type: string; // Enum?
}

export type RelationshipMap = StringTMap<Relationship>;
