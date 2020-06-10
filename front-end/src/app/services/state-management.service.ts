import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  StateVariable,
  StateEnumerationMap,
  StateVariableMap,
  StateEnumeration,
  Relationship,
  RelationshipMap,
  InformationTypesMap,
  EventMap,
  Event,
  CollectionMap
} from '../models';
import { environment } from 'src/environments/environment';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {
  constructor(private http: HttpClient) {}

  public createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(
      baseUrl + '/event',
      event
    );
  }

  public createRelationship(relationship: Relationship): Observable<Relationship> {
    return this.http.post<Relationship>(
      baseUrl + '/relationship',
      relationship
    );
  }

  public createStateVariable(stateVariable: StateVariable): Observable<StateVariable> {
    return this.http.post<StateVariable>(
      baseUrl + '/state-variable',
      stateVariable
    );
  }

  public editEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(
      baseUrl + '/event',
      event
    );
  }

  public editRelationship(relationship: Relationship): Observable<Relationship> {
    return this.http.put<Relationship>(
      baseUrl + '/relationship',
      relationship
    );
  }

  public editStateVariable(stateVariable: StateVariable): Observable<StateVariable> {
    return this.http.put<StateVariable>(
      baseUrl + '/state-variable',
      stateVariable
    );
  }

  public getCollections(): Observable<CollectionMap> {
    return this.http.get<CollectionMap>(
      baseUrl + '/collections'
    );
  }

  public getEventMap(collectionId: number): Observable<EventMap> {
    return this.http.get<EventMap>(
      baseUrl + '/collection/' + collectionId + '/event-map'
    );
  }

  public getEventHistoryMap(collectionId: number): Observable<EventMap> {
    return this.http.get<EventMap>(
      baseUrl + '/collection/' + collectionId + '/event-history-map'
    );
  }

  public getIdentifiers(): Observable<string[]> {
    return this.http.get<string[]>(
      baseUrl + '/state-identifiers'
    );
  }

  public getInformationTypes(collectionId: number): Observable<InformationTypesMap> {
    return this.http.get<InformationTypesMap>(
      baseUrl + '/collection/' + collectionId + '/information-types'
    );
  }

  public getRelationships(): Observable<RelationshipMap> {
    return this.http.get<RelationshipMap>(
      baseUrl + '/relationships'
    );
  }

  public getRelationshipHistory(): Observable<RelationshipMap> {
    return this.http.get<RelationshipMap>(
      baseUrl + '/relationship-history'
    );
  }

  public getStateEnumerations(): Observable<StateEnumerationMap> {
    return this.http.get<StateEnumerationMap>(
      baseUrl + '/state-enumerations'
    );
  }

  public getStateHistory(): Observable<StateVariableMap> {
    return this.http.get<StateVariableMap>(
      baseUrl + '/state-history'
    );
  }

  public getStateVariables(): Observable<StateVariableMap> {
    return this.http.get<StateVariableMap>(
      baseUrl + '/state-variables'
    );
  }

  public saveEnumerations(stateVariableId: number, enumerations: StateEnumeration[]): Observable<StateEnumeration[]> {
    return this.http.post<StateEnumeration[]>(
      baseUrl + '/state-enumerations/' + stateVariableId,
      enumerations
    );
  }

  public saveEnumerationsCsv(file: File): Observable<StateEnumerationMap> {
    const formData = this.setFormData(file);

    return this.http.post<StateEnumerationMap>(
      baseUrl + '/enumerations-csv',
      formData
    );
  }

  public saveEnumerationsJson(file: File): Observable<StateEnumerationMap> {
    const formData = this.setFormData(file);

    return this.http.post<StateEnumerationMap>(
      baseUrl + '/enumerations-json',
      formData
    );
  }

  public saveEventsCsv(file: File, collectionId: number): Observable<EventMap> {
    const formData = this.setFormData(file);

    return this.http.post<EventMap>(
      baseUrl + '/collection/' + collectionId + '/events-csv',
      formData
    );
  }

  public saveEventsJson(file: File, collectionId: number): Observable<EventMap> {
    const formData = this.setFormData(file);

    return this.http.post<EventMap>(
      baseUrl + '/collection/' + collectionId + '/events-json',
      formData
    );
  }

  public saveInformationTypesCsv(file: File, collectionId: number): Observable<InformationTypesMap> {
    const formData = this.setFormData(file);

    return this.http.post<InformationTypesMap>(
      baseUrl + '/collection/' + collectionId + '/information-types-csv',
      formData
    );
  }

  public saveInformationTypesJson(file: File, collectionId: number): Observable<InformationTypesMap> {
    const formData = this.setFormData(file);

    return this.http.post<InformationTypesMap>(
      baseUrl + '/collection/' + collectionId + '/information-types-json',
      formData
    );
  }

  public saveRelationshipsCsv(file: File): Observable<RelationshipMap> {
    const formData = this.setFormData(file);

    return this.http.post<RelationshipMap>(
      baseUrl + '/relationships-csv',
      formData
    );
  }

  public saveRelationshipsJson(file: File): Observable<RelationshipMap> {
    const formData = this.setFormData(file);

    return this.http.post<RelationshipMap>(
      baseUrl + '/relationships-json',
      formData
    );
  }

  public saveStateVariablesCsv(file: File): Observable<StateVariableMap> {
    const formData = this.setFormData(file);

    return this.http.post<StateVariableMap>(
      baseUrl + '/state-variables-csv',
      formData
    );
  }

  public saveStateVariablesJson(file: File): Observable<StateVariableMap> {
    const formData = this.setFormData(file);

    return this.http.post<StateVariableMap>(
      baseUrl + '/state-variables-json',
      formData
    );
  }

  private setFormData(file: File): FormData {
    const formData = new FormData();

    formData.append('file', file);

    return formData;
  }
}
