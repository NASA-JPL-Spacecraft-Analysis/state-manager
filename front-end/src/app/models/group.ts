import { Event } from './event';
import { InformationTypes } from './information-types';
import { State } from './state';

export interface Group {
  collectionId: string;
  groupMappings: GroupMapping[];
  id: string;
  name: string;
}

export interface GroupMapping {
  groupId?: string;
  id: string;
  item: GroupItemType;
  itemId: string;
}

export type GroupItemType =
  | Event
  | InformationTypes
  | State;

export interface GroupUpload {
  name: string;
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
