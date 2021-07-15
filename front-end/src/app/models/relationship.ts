import { StringTMap } from './string-t-map';

export interface Relationship {
  displayName: string;
  description: string;
  id: string;
  subjectType: string;
  subjectTypeId: string;
  targetType: string;
  targetTypeId: string;
}

export interface RelationshipHistory extends Relationship {
  relationshipId: string;
  updated: Date;
}

export interface RelationshipUpload extends Relationship {
  subjectIdentifier: string;
  targetIdentifier: string;
}

export type RelationshipMap = StringTMap<Relationship>;
