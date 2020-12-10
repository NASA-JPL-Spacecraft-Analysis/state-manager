import { StringTMap } from './string-t-map';

export interface Event {
  id: string;
  collectionId: string;
  identifier: string;
  displayName: string;
  description: string;
  externalLink: string;
  editable: boolean;
}

export interface EventHistory extends Event {
  eventId: string;
  updated: Date;
}

export type EventMap = StringTMap<Event>;
