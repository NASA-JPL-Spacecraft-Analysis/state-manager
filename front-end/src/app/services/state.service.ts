import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { State, StateMap, StateEnumeration, StateEnumerationMap, StateHistory } from '../models';
import { addCollectionId, setFormData } from './service-utils';

import * as gql from './gql';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) {}

  public createState(collectionId: number, newState: State): Observable<State> {
    return this.apollo
      .mutate<{ createState: State }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_STATE,
        variables: {
          collection_id: collectionId,
          description: newState.description,
          display_name: newState.displayName,
          identifier: newState.identifier,
          source: newState.source,
          subsystem: newState.subsystem,
          type: newState.type,
          units: newState.units
        }
      })
      .pipe(
        map(({ data: { createState } }) => createState )
      );
  }

  public editState(collectionId: number, state: State): Observable<State> {
    return this.http.put<State>(
      addCollectionId(collectionId) + 'state',
      state
    );
  }

  /**
   * TODO: Figure out a way to exclude enumerations for when we query for states on the relationships page.
   */
  public getStates(collectionId: number): Observable<{
    states: State[]
  }> {
    return this.apollo
      .query<{ states: State[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_STATES,
        variables: { collection_id: collectionId }
      })
      .pipe(map(({ data }) => data));
  }

  public getStateHistory(collectionId: number): Observable<StateHistory[]> {
    return this.apollo
      .query<{ stateHistory: StateHistory[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_STATE_HISTORY,
        variables: { collection_id: collectionId }
      })
      .pipe(map(({ data: { stateHistory } }) => stateHistory));
  }

  public saveEnumerations(collectionId: number, stateId: number, enumerations: StateEnumeration[]): Observable<StateEnumeration[]> {
    return this.http.post<StateEnumeration[]>(
      addCollectionId(collectionId) + 'state-enumerations/' + stateId,
      enumerations
    );
  }

  public saveEnumerationsCsv(collectionId: number, file: File): Observable<StateEnumerationMap> {
    const formData = setFormData(file);

    return this.http.post<StateEnumerationMap>(
      addCollectionId(collectionId) + 'enumerations-csv',
      formData
    );
  }

  public saveEnumerationsJson(collectionId: number, file: File): Observable<StateEnumerationMap> {
    const formData = setFormData(file);

    return this.http.post<StateEnumerationMap>(
      addCollectionId(collectionId) + 'enumerations-json',
      formData
    );
  }


  public saveStatesCsv(collectionId: number, file: File): Observable<StateMap> {
    const formData = setFormData(file);

    return this.http.post<StateMap>(
      addCollectionId(collectionId) + 'states-csv',
      formData
    );
  }

  public saveStatesJson(collectionId: number, file: File): Observable<StateMap> {
    const formData = setFormData(file);

    return this.http.post<StateMap>(
      addCollectionId(collectionId) + 'states-json',
      formData
    );
  }
}
