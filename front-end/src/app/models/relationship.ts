import { StringTMap } from './string-t-map';
import { InformationTypeEnum } from './information-types';

export interface Relationship {
  displayName: string;
  description: string;
  id: string;
  subjectType: InformationTypeEnum;
  subjectTypeId: string;
  targetType: InformationTypeEnum;
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
