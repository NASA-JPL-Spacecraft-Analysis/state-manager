import { IdentifierType } from './identifier-type';

export interface Event extends IdentifierType {}

export interface EventHistory extends Event {
  eventId: string;
  updated: Date;
}

export type EventMap = Record<string, Event>;

export const eventTypes: string[] = [
  'evr',
  'predict_event',
  'command_instance',
  'activity_instance',
  'user'
];
