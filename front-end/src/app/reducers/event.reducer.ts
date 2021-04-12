import { createReducer, on } from '@ngrx/store';

import { EventActions, FileUploadActions } from '../actions';
import { EventMap, Event, IdentifierMap } from '../models';

export interface EventState {
  eventIdentifierMap: IdentifierMap;
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
  on(EventActions.updateEventSuccess, (state, { event }) => {
    return modifyEvent(state, event);
  }),
  on(FileUploadActions.uploadEventsSuccess, (state, { events }) => {
    const eventMap = {};

    for (const event of events) {
      eventMap[event.id] = event;
    }

    return {
      ...state,
      eventMap: {
        ...state.eventMap,
        ...eventMap
      }
    };
  }),
  on(EventActions.setEvents, (state, { events }) => {
    const eventMap = {};
    const eventIdentifierMap = {};

    for (const event of events) {
      eventMap[event.id] = event;
      eventIdentifierMap[event.identifier] = true;
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
  on(EventActions.setEventHistory, (state, { eventHistory }) => {
    const eventHistoryMap = {};

    for (const eventHistoryItem of eventHistory) {
      eventHistoryMap[eventHistoryItem.id] = eventHistoryItem;
    }

    return {
      ...state,
      eventHistoryMap: {
        ...eventHistoryMap
      }
    };
  }),
  on(EventActions.setSelectedEvent, (state, { event }) => ({
    ...state,
    selectedEvent: event
  }))
);

function modifyEvent(state: EventState, event: Event) {
  const eventIdentifierMap = {
    ...state.eventIdentifierMap
  };

  for (const identifier of Object.keys(eventIdentifierMap)) {
    // Remove the old identifier from our map
    if (eventIdentifierMap[identifier] === event.id) {
      delete eventIdentifierMap[identifier];
    }
  }

  return {
    ...state,
    eventIdentifierMap: {
      ...eventIdentifierMap,
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
