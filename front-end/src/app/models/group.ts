import { AutoCompleteType } from './autocomplete';
import { Event } from './event';
import { InformationType } from './information-type';
import { State } from './state';
import { StringTMap } from './string-t-map';

export interface Group {
  collectionId: string;
  groupMappings: GroupMapping[];
  id: string;
  identifier: string;
}

export type GroupMap = StringTMap<Event>;

export interface GroupMapping {
  groupId?: string;
  id: string;
  item: AutoCompleteType;
  itemId: string;
}

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
