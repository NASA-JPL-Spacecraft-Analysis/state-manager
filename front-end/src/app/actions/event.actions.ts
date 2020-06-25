import { createAction, props } from '@ngrx/store';

import { Event, EventMap } from '../models';

export const createEvent = createAction(
  '[event] createEvent',
  props<{ event: Event }>()
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
  props<{ event: Event }>()
);

export const editEventFailure = createAction(
  '[event] editEventFailure',
  props<{ error: Error }>()
);

export const editEventSuccess = createAction(
  '[event] editEventSuccess',
  props<{ event: Event }>()
);

export const fetchEventMapFailure = createAction(
  '[event] fetchEventMapFailure',
  props<{ error: Error }>()
);

export const fetchEventHistoryMapFailure = createAction(
  '[event] fetchEventHistoryMapFailure',
  props<{ error: Error }>()
);

export const setEventMap = createAction(
  '[event] setEventMap',
  props<{ eventMap: EventMap }>()
);

export const setEventHistoryMap = createAction(
  '[event] setEventHistoryMap',
  props<{ eventHistoryMap: EventMap }>()
);

export const setSelectedEvent = createAction(
  '[event] setSelectedEvent',
  props<{ event: Event}>()
);
