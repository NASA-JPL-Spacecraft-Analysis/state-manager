import { StateVariable } from './state-variable';

// TODO: Figure out final types.
export interface Relationship {
  displayName: string;
  description: string;
  subjectStates: StateVariable[];
  targetStates: StateVariable[];
  type: string; // Enum?
}
