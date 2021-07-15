import { IdentifierType } from './identifier-type';
import { StringTMap } from './string-t-map';

export interface Event extends IdentifierType {}

export interface EventHistory extends Event {
  eventId: string;
  updated: Date;
}

export type EventMap = StringTMap<Event>;

export const eventTypes: string[] = [
  'evr',
  'predict_event',
  'command_instance',
  'activity_instance',
  'user'
];
