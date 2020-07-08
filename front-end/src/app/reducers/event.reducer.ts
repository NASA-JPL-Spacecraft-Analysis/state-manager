import { createReducer, on } from '@ngrx/store';

import { EventActions, FileUploadActions } from '../actions';
import { EventMap, Event } from '../models';

export interface EventState {
  eventIdentifierMap: Map<string, number>;
  eventMap: EventMap;
  eventHistoryMap: EventMap;
  selectedEvent: Event;
}

export const initialState: EventState = {
  eventIdentifierMap: null,
  eventMap: null,
  eventHistoryMap: null,
  selectedEvent: null
};

export const reducer = createReducer(
  initialState,
  on(EventActions.createEventSuccess, (state, { event }) => {
    return modifyEvent(state, event);
  }),
  on(EventActions.editEventSuccess, (state, { event }) => {
    return modifyEvent(state, event);
  }),
  on(FileUploadActions.uploadEventsSuccess, (state, { eventMap }) => ({
    ...state,
    eventMap: {
      ...state.eventMap,
      ...eventMap
    }
  })),
  on(EventActions.setEventMap, (state, { eventMap }) => {
    const eventIdentifierMap = new Map<string, number>();

    for (const key of Object.keys(eventMap)) {
      eventIdentifierMap[eventMap[key].identifier] = key;
    }

    return {
      ...state,
      eventIdentifierMap: {
        ...eventIdentifierMap
      },
      eventMap: {
        ...eventMap
      }
    };
  }),
  on(EventActions.setEventHistoryMap, (state, { eventHistoryMap }) => ({
    ...state,
    eventHistoryMap: {
      ...eventHistoryMap
    }
  })),
  on(EventActions.setSelectedEvent, (state, { event }) => ({
    ...state,
    selectedEvent: event
  }))
);

function modifyEvent(state: EventState, event: Event) {
  return {
    ...state,
    eventIdentifierMap: {
      ...state.eventIdentifierMap,
      [event.id]: event.identifier
    },
    eventMap: {
      ...state.eventMap,
      [event.id]: {
        ...event
      }
    },
    selectedEvent: event
  };
}
