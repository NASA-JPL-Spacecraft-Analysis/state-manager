import { IdentifierType } from './identifier-type';

export interface Event extends IdentifierType { }

export interface EventHistory extends Event {
  eventId: string;
  updated: Date;
}

export type EventMap = Record<string, Event>;
