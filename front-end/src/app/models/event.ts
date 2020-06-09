import { StringTMap } from './string-t-map';

export interface Event {
  id: number;
  collectionId: number;
  eventId?: number;
  identifier: string;
  displayName: string;
  description: string;
  externalLink: string;
  editable: boolean;
  updated?: Date;
}

export type EventMap = StringTMap<Event>;
