import { StringTMap } from './string-t-map';
import { InformationTypeEnum } from './information-types';

export interface Relationship {
  id: number;
  displayName: string;
  description: string;
  subjectType: InformationTypeEnum;
  targetType: InformationTypeEnum;
  subjectTypeId: number;
  targetTypeId: number;
}

export interface RelationshipHistory extends Relationship {
  relationshipId?: number;
  updated?: Date;
}

export type RelationshipMap = StringTMap<Relationship>;
