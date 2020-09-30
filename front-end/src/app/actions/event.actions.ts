import { createAction, props } from '@ngrx/store';

import { Event } from '../models';

export const createEvent = createAction(
  '[event] createEvent',
  props<{ collectionId: number, event: Event }>()
);

export const createEventFailure = createAction(
  '[event] createEventFailure',
  props<{ error: Error }>()
);

export const createEventSuccess = createAction(
  '[event] createEventSuccess',
  props<{ event: Event }>()
);

export const editEvent = createAction(
  '[event] editEvent',
  props<{ collectionId: number, event: Event }>()
);

export const editEventFailure = createAction(
  '[event] editEventFailure',
  props<{ error: Error }>()
);

export const editEventSuccess = createAction(
  '[event] editEventSuccess',
  props<{ event: Event }>()
);

export const fetchEventIdentifiersFailure = createAction(
  '[event] fetchEventIdentifiersFailure',
  props<{ error: Error }>()
);

export const fetchEventMapFailure = createAction(
  '[event] fetchEventMapFailure',
  props<{ error: Error }>()
);

export const fetchEventHistoryMapFailure = createAction(
  '[event] fetchEventHistoryMapFailure',
  props<{ error: Error }>()
);

export const setEventIdentifiers = createAction(
  '[event] setEventIdentifiers',
  props<{ eventIdentifiers: string[] }>()
);

export const setEvents = createAction(
  '[event] setEvents',
  props<{ events: Event[] }>()
);

export const setEventHistory = createAction(
  '[event] setEventHistory',
  props<{ eventHistory: Event[] }>()
);

export const setSelectedEvent = createAction(
  '[event] setSelectedEvent',
  props<{ event: Event}>()
);
