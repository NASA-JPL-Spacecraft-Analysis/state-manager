import { AutoCompleteType } from './autocomplete';

export interface Group {
  collectionId: string;
  groupMappings: GroupMapping[];
  id: string;
  identifier: string;
}

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
