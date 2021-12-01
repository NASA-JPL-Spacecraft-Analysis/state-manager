import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';

import { EventActions, FileUploadActions } from '../actions';
import { mapIdentifiers, mapItems } from '../functions/helpers';
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
  on(EventActions.createEventSuccess, (state, { event }) => modifyEvent(state, event)),
  on(EventActions.updateEventSuccess, (state, { event }) => modifyEvent(state, event)),
  on(FileUploadActions.uploadEventsSuccess, (state, { events }) => ({
    ...state,
    eventMap: {
      ...state.eventMap,
      ...mapItems(events) as EventMap
    },
    eventIdentifierMap: {
      ...state.eventIdentifierMap,
      ...mapIdentifiers(events)
    }
  })),
  on(EventActions.setEvents, (state, { events }) => ({
    ...state,
    eventMap: {
      ...mapItems(events) as EventMap
    },
    eventIdentifierMap: {
      ...mapIdentifiers(events)
    }
  })),
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

const modifyEvent = (state: EventState, event: Event): EventState => {
  const eventIdentifierMap = cloneDeep(state.eventIdentifierMap);

  for (const identifier of Object.keys(eventIdentifierMap)) {
    let index = 0;

    for (const item of eventIdentifierMap[identifier]) {
      if (item.id === event.id) {
        eventIdentifierMap[identifier] = eventIdentifierMap[identifier].splice(index, 1);
      }

      index++;
    }
  }

  const currentIdentifierMap =
        eventIdentifierMap[event.identifier] ? eventIdentifierMap[event.identifier] : [];

  return {
    ...state,
    eventIdentifierMap: {
      ...state.eventIdentifierMap,
      [event.identifier]: [
        ...currentIdentifierMap,
        {
          id: event.id,
          type: event.type
        }
      ]
    },
    eventMap: {
      ...state.eventMap,
      [event.id]: {
        ...event
      }
    },
    selectedEvent: event
  };
};
