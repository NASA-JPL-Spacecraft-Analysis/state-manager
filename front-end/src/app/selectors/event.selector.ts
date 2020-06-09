import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventState } from '../reducers/event.reducer';

export const getEventState = createFeatureSelector<EventState>(
  'event'
);

export const getEventMap = createSelector(
  getEventState,
  (state: EventState) => state.eventMap
);

export const getEventHistoryMap = createSelector(
  getEventState,
  (state: EventState) => state.eventHistoryMap
);

export const getSelectedEvent = createSelector(
  getEventState,
  (state: EventState) => state.selectedEvent
);
