import { StringTMap } from './string-t-map';
import { InformationTypeEnum } from './information-types';

export interface Relationship {
  displayName: string;
  description: string;
  id: number;
  subjectType: InformationTypeEnum;
  subjectTypeId: number;
  targetType: InformationTypeEnum;
  targetTypeId: number;
}

export interface RelationshipHistory extends Relationship {
  relationshipId: number;
  updated: Date;
}

export interface RelationshipUpload extends Relationship {
  subjectIdentifier: string;
  targetIdentifier: string;
}

export type RelationshipMap = StringTMap<Relationship>;
