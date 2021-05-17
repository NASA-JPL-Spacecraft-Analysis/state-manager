import { Event } from '../event';
import { Response } from './response';

export type EventResponse = Response & { event: Event };
