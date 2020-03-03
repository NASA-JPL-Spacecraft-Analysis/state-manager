import { StringTMap } from './string-t-map';

// TODO: Figure out final types.
export interface Relationship {
  id: number;
  displayName: string;
  description: string;
  subjectStateId: number;
  targetStateId: number;
  type: string;
  targetName: string;
}

export type RelationshipMap = StringTMap<Relationship>;
