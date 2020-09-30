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
    return this.http.post<Event>(
      addCollectionId(collectionId) + 'event',
      event
    );
  }

  public editEvent(collectionId: number, event: Event): Observable<Event> {
    return this.http.put<Event>(
      addCollectionId(collectionId) + 'event',
      event
    );
  }

  public getEvents(collectionId: number): Observable<Event[]> {
    return this.apollo
      .query<{ events: Event[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_EVENTS,
        variables: { collection_id: collectionId }
      })
      .pipe(map(({ data: { events } }) => events));
  }

  public getEventHistory(collectionId: number): Observable<Event[]> {
    return this.apollo
      .query<{ eventHistory: Event[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_EVENT_HISTORY,
        variables: { collection_id: collectionId }
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
}
