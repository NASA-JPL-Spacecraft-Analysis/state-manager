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
  id: string;
  item: GroupItemType;
  itemId: string;
}

export type GroupItemType =
  | Event
  | InformationTypes
  | State;
