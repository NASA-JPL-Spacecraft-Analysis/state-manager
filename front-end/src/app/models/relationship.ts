import { StringTMap } from './string-t-map';

export interface Relationship {
  displayName: string;
  description: string;
  id: string;
  subjectIdentifier?: string;
  subjectType: string;
  subjectTypeId: string;
  targetIdentifier?: string;
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

export type RelationshipMap = Record<string, Relationship>;

export enum RelationshipTypeEnum {
  'Command' = 'Command',
  'Command Argument' = 'Command Argument',
  'Constraint' = 'Constraint',
  'Event' = 'Event',
  'Information Type' = 'Information Type',
  'State Enumeration' = 'State Enumeration',
  'State' = 'State'
};
