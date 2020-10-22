import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Event, EventMap } from './../models';
import { addCollectionId, setFormData } from './service-utils';

import * as gql from './gql';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) {}

  public createEvent(collectionId: number, event: Event): Observable<Event> {
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

  public getEvents(collectionId: number): Observable<Event[]> {
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

  public getEventHistory(collectionId: number): Observable<Event[]> {
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

  public saveEventsCsv(file: File, collectionId: number): Observable<EventMap> {
    const formData = setFormData(file);

    return this.http.post<EventMap>(
      addCollectionId(collectionId) + 'events-csv',
      formData
    );
  }

  public saveEventsJson(file: File, collectionId: number): Observable<EventMap> {
    const formData = setFormData(file);

    return this.http.post<EventMap>(
      addCollectionId(collectionId) + 'events-json',
      formData
    );
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
          // TODO: Track down where the id is turned into a string at some point so we can remove this conversion.
          id: Number(event.id),
          identifier: event.identifier
        }
      })
      .pipe(
        map(({ data: { updateEvent }}) => updateEvent)
      );
  }
}
