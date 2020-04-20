import { StringTMap } from './string-t-map';
import { InformationTypeEnum } from './information-types';

// TODO: Figure out final types.
export interface Relationship {
  id: number;
  relationshipId?: number;
  displayName: string;
  description: string;
  subjectType: InformationTypeEnum;
  targetType: InformationTypeEnum;
  subjectTypeId: number;
  targetTypeId: number;
  updated?: Date;
}

export type RelationshipMap = StringTMap<Relationship>;
