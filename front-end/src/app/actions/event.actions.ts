import { createAction, props } from '@ngrx/store';

import { Event } from '../models';

export const createEvent = createAction(
  '[event] createEvent',
  props<{ collectionId: string; event: Event }>()
);

export const createEventFailure = createAction(
  '[event] createEventFailure',
  props<{ error: Error }>()
);

export const createEventSuccess = createAction(
  '[event] createEventSuccess',
  props<{ event: Event }>()
);

export const fetchEventsFailure = createAction(
  '[event] fetchEventsFailure',
  props<{ error: Error }>()
);

export const fetchEventHistoryMapFailure = createAction(
  '[event] fetchEventHistoryMapFailure',
  props<{ error: Error }>()
);

export const fetchEventTypesFailure = createAction(
  '[event] fetchEventTypesFailure',
  props<{ error: Error }>()
);

export const setEvents = createAction(
  '[event] setEvents',
  props<{ events: Event[] }>()
);

export const setEventHistory = createAction(
  '[event] setEventHistory',
  props<{ eventHistory: Event[] }>()
);

export const setEventTypes = createAction(
  '[event] setEventTypes',
  props<{ eventTypes: string[] }>()
);

export const setSelectedEvent = createAction(
  '[event] setSelectedEvent',
  props<{ event: Event }>()
);

export const updateEvent = createAction(
  '[event] updateEvent',
  props<{ event: Event }>()
);

export const updateEventFailure = createAction(
  '[event] updateEventFailure',
  props<{ error: Error }>()
);

export const updateEventSuccess = createAction(
  '[event] updateEventSuccess',
  props<{ event: Event }>()
);
