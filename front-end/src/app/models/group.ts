import { Event } from './event';
import { InformationTypes } from './information-types';
import { State } from './state';

export interface Group {
  groupMappings: GroupMapping[];
  id: string;
  name: string;
}

export interface GroupMapping {
  id: string;
  item: Event | InformationTypes | State;
  itemId: string;
}
