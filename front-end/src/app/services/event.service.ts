import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Event, EventResponse, EventsResponse } from './../models';

import * as gql from './gql';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(
    private apollo: Apollo
  ) {}

  public createEvent(collectionId: string, event: Event): Observable<EventResponse> {
    return this.apollo
      .mutate<{ createEvent: EventResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_EVENT,
        variables: {
          collectionId,
          description: event.description,
          displayName: event.displayName,
          editable: event.editable,
          externalLink: event.externalLink,
          identifier: event.identifier,
          type: event.type,
          version: event.version
        }
      })
      .pipe(map(({ data: { createEvent }}) => {
        if (!createEvent.success) {
          throw new Error(createEvent.message);
        }

        return createEvent;
      }));
  }

  public createEvents(collectionId: string, events: Event[]): Observable<EventsResponse> {
    return this.apollo
      .mutate<{ createEvents: EventsResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_EVENTS,
        variables: {
          collectionId,
          events
        }
      })
      .pipe(map(({ data: { createEvents } }) => {
        if (!createEvents.success) {
          throw new Error(createEvents.message);
        }

        return createEvents;
      }));
  }

  public getEvents(collectionId: string): Observable<Event[]> {
    return this.apollo
      .query<{ events: Event[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_EVENTS,
        variables: {
          collectionId
        }
      })
      .pipe(map(({ data: { events } }) => events));
  }

  public getEventHistory(collectionId: string): Observable<Event[]> {
    return this.apollo
      .query<{ eventHistory: Event[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_EVENT_HISTORY,
        variables: {
          collectionId
        }
      })
      .pipe(map(({ data: { eventHistory } }) => eventHistory));
  }

  public updateEvent(event: Event): Observable<EventResponse> {
    return this.apollo
      .mutate<{ updateEvent: EventResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.UPDATE_EVENT,
        variables: {
          description: event.description,
          displayName: event.displayName,
          editable: event.editable,
          externalLink: event.externalLink,
          id: event.id,
          identifier: event.identifier,
          type: event.type,
          version: event.version
        }
      })
      .pipe(map(({ data: { updateEvent }}) => {
        if (!updateEvent.success) {
          throw new Error(updateEvent.message);
        }

        return updateEvent;
      }));
  }
}
