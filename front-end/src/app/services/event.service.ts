import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Event } from './../models';

import * as gql from './gql';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(
    private apollo: Apollo
  ) {}

  public createEvent(collectionId: string, event: Event): Observable<Event> {
    return this.apollo
      .mutate<{ createEvent: Event }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_EVENT,
        variables: {
          collection_id: collectionId,
          description: event.description,
          display_name: event.displayName,
          editable: event.editable,
          external_link: event.externalLink,
          identifier: event.identifier
        }
      })
      .pipe(map(({ data: { createEvent }}) => createEvent));
  }

  public createEvents(collectionId: string, events: Event[]): Observable<Event[]> {
    return this.apollo
      .mutate<{ createEvents: Event[] }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_EVENTS,
        variables: {
          collection_id: collectionId,
          events
        }
      })
      .pipe(map(({ data: { createEvents } }) => createEvents));
  }

  public getEvents(collectionId: string): Observable<Event[]> {
    return this.apollo
      .query<{ events: Event[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_EVENTS,
        variables: {
          collection_id: collectionId
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
          collection_id: collectionId
        }
      })
      .pipe(map(({ data: { eventHistory } }) => eventHistory));
  }

  public updateEvent(event: Event): Observable<Event> {
    return this.apollo
      .mutate<{ updateEvent: Event }>({
        fetchPolicy: 'no-cache',
        mutation: gql.UPDATE_EVENT,
        variables: {
          description: event.description,
          display_name: event.displayName,
          editable: event.editable,
          external_link: event.externalLink,
          id: event.id,
          identifier: event.identifier
        }
      })
      .pipe(
        map(({ data: { updateEvent }}) => updateEvent)
      );
  }
}
