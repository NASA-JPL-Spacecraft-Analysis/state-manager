import { StringTMap } from './string-t-map';

// TODO: Figure out final types.
export interface Relationship {
  id: number;
  relationshipId?: number;
  displayName: string;
  description: string;
  subjectStateId: number;
  targetStateId: number;
  type: string;
  targetName: string;
  updated?: Date;
}

export type RelationshipMap = StringTMap<Relationship>;
