import { Event } from './event';
import { InformationType } from './information-type';
import { State } from './state';

export interface Group {
  collectionId: string;
  groupMappings: GroupMapping[];
  id: string;
  identifier: string;
}

export interface GroupMapping {
  groupId?: string;
  id: string;
  item: GroupItemType;
  itemId: string;
}

export type GroupItemType =
  | Event
  | InformationType
  | State;

export interface GroupUpload {
  identifier: string;
}

export interface GroupUploadMappings extends GroupUpload {
  groupMappings: GroupMappingUpload[];
}

export interface GroupMappingUpload {
  itemIdentifier: string;
  itemType: string;
  sortOrder?: number;
}

export type MappingsUpload = GroupUpload & GroupMappingUpload;
