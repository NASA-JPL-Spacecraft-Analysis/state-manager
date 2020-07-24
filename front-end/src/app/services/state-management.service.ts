import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  CollectionMap,
  EventMap,
  Event,
  InformationTypesMap,
  Relationship,
  RelationshipMap,
  State,
  StateMap,
  StateEnumerationMap,
  StateEnumeration,
  Collection
} from '../models';
import { environment } from 'src/environments/environment';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {
  constructor(private http: HttpClient) {}

  public createCollection(name: string): Observable<Collection> {
    return this.http.post<Collection>(
      baseUrl + '/collection',
      name
    );
  }

  public createEvent(collectionId: number, event: Event): Observable<Event> {
    return this.http.post<Event>(
      this.addCollectionId(collectionId) + 'event',
      event
    );
  }

  public createRelationship(collectionId: number, relationship: Relationship): Observable<Relationship> {
    return this.http.post<Relationship>(
      this.addCollectionId(collectionId) + 'relationship',
      relationship
    );
  }

  public createState(collectionId: number, state: State): Observable<State> {
    return this.http.post<State>(
      this.addCollectionId(collectionId) + 'state',
      state
    );
  }

  public deleteCollection(collectionId: number): Observable<number> {
    return this.http.delete<number>(
      this.addCollectionId(collectionId)
    );
  }

  public editCollection(collectionId: number, name: string): Observable<Collection> {
    return this.http.put<Collection>(
      this.addCollectionId(collectionId),
      name
    );
  }

  public editEvent(collectionId: number, event: Event): Observable<Event> {
    return this.http.put<Event>(
      this.addCollectionId(collectionId) + 'event',
      event
    );
  }

  public editRelationship(collectionId: number, relationship: Relationship): Observable<Relationship> {
    return this.http.put<Relationship>(
      this.addCollectionId(collectionId) + 'relationship',
      relationship
    );
  }

  public editState(collectionId: number, state: State): Observable<State> {
    return this.http.put<State>(
      this.addCollectionId(collectionId) + 'state',
      state
    );
  }

  public getCollections(): Observable<CollectionMap> {
    return this.http.get<CollectionMap>(
      baseUrl + '/collections'
    );
  }

  public getEventMap(collectionId: number): Observable<EventMap> {
    return this.http.get<EventMap>(
      this.addCollectionId(collectionId) + 'event-map'
    );
  }

  public getEventHistoryMap(collectionId: number): Observable<EventMap> {
    return this.http.get<EventMap>(
      this.addCollectionId(collectionId) + 'event-history-map'
    );
  }

  public getInformationTypes(collectionId: number): Observable<InformationTypesMap> {
    return this.http.get<InformationTypesMap>(
      this.addCollectionId(collectionId) + 'information-types'
    );
  }

  public getRelationships(collectionId: number): Observable<RelationshipMap> {
    return this.http.get<RelationshipMap>(
      this.addCollectionId(collectionId) + 'relationships'
    );
  }

  public getRelationshipHistory(collectionId: number): Observable<RelationshipMap> {
    return this.http.get<RelationshipMap>(
      this.addCollectionId(collectionId) + 'relationship-history'
    );
  }

  public getStateEnumerations(collectionId: number): Observable<StateEnumerationMap> {
    return this.http.get<StateEnumerationMap>(
      this.addCollectionId(collectionId) + 'state-enumerations'
    );
  }

  public getStateHistory(collectionId: number): Observable<StateMap> {
    return this.http.get<StateMap>(
      this.addCollectionId(collectionId) + 'state-history'
    );
  }

  public getStates(collectionId: number): Observable<StateMap> {
    return this.http.get<StateMap>(
      this.addCollectionId(collectionId) + 'states'
    );
  }

  public saveEnumerations(collectionId: number, stateId: number, enumerations: StateEnumeration[]): Observable<StateEnumeration[]> {
    return this.http.post<StateEnumeration[]>(
      this.addCollectionId(collectionId) + 'state-enumerations/' + stateId,
      enumerations
    );
  }

  public saveEnumerationsCsv(collectionId: number, file: File): Observable<StateEnumerationMap> {
    const formData = this.setFormData(file);

    return this.http.post<StateEnumerationMap>(
      this.addCollectionId(collectionId) + 'enumerations-csv',
      formData
    );
  }

  public saveEnumerationsJson(collectionId: number, file: File): Observable<StateEnumerationMap> {
    const formData = this.setFormData(file);

    return this.http.post<StateEnumerationMap>(
      this.addCollectionId(collectionId) + 'enumerations-json',
      formData
    );
  }

  public saveEventsCsv(file: File, collectionId: number): Observable<EventMap> {
    const formData = this.setFormData(file);

    return this.http.post<EventMap>(
      this.addCollectionId(collectionId) + 'events-csv',
      formData
    );
  }

  public saveEventsJson(file: File, collectionId: number): Observable<EventMap> {
    const formData = this.setFormData(file);

    return this.http.post<EventMap>(
      this.addCollectionId(collectionId) + 'events-json',
      formData
    );
  }

  public saveInformationTypesCsv(file: File, collectionId: number): Observable<InformationTypesMap> {
    const formData = this.setFormData(file);

    return this.http.post<InformationTypesMap>(
      this.addCollectionId(collectionId) + 'information-types-csv',
      formData
    );
  }

  public saveInformationTypesJson(file: File, collectionId: number): Observable<InformationTypesMap> {
    const formData = this.setFormData(file);

    return this.http.post<InformationTypesMap>(
      this.addCollectionId(collectionId) + 'information-types-json',
      formData
    );
  }

  public saveRelationshipsCsv(collectionId: number, file: File): Observable<RelationshipMap> {
    const formData = this.setFormData(file);

    return this.http.post<RelationshipMap>(
      this.addCollectionId(collectionId) + 'relationships-csv',
      formData
    );
  }

  public saveRelationshipsJson(collectionId: number, file: File): Observable<RelationshipMap> {
    const formData = this.setFormData(file);

    return this.http.post<RelationshipMap>(
      this.addCollectionId(collectionId) + 'relationships-json',
      formData
    );
  }

  public saveStatesCsv(collectionId: number, file: File): Observable<StateMap> {
    const formData = this.setFormData(file);

    return this.http.post<StateMap>(
      this.addCollectionId(collectionId) + 'states-csv',
      formData
    );
  }

  public saveStatesJson(collectionId: number, file: File): Observable<StateMap> {
    const formData = this.setFormData(file);

    return this.http.post<StateMap>(
      this.addCollectionId(collectionId) + 'states-json',
      formData
    );
  }

  private addCollectionId(collectionId: number): string {
    return baseUrl + '/collection/' + collectionId + '/';
  }

  private setFormData(file: File): FormData {
    const formData = new FormData();

    formData.append('file', file);

    return formData;
  }
}
