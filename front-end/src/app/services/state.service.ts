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

  public createState(collectionId: number, state: State): Observable<State> {
    return this.apollo
      .mutate<{ createState: State }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_STATE,
        variables: {
          collection_id: collectionId,
          description: state.description,
          display_name: state.displayName,
          identifier: state.identifier,
          source: state.source,
          subsystem: state.subsystem,
          type: state.type,
          units: state.units
        }
      })
      .pipe(
        map(({ data: { createState } }) => createState )
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

  public updateState(state: State): Observable<State> {
    return this.apollo
      .mutate<{ updateState: State }>({
        fetchPolicy: 'no-cache',
        mutation: gql.UPDATE_STATE,
        variables: {
          description: state.description,
          display_name: state.displayName,
          // TODO: Track down where the id is turned into a string at some point so we can remove this conversion.
          id: Number(state.id),
          identifier: state.identifier,
          source: state.source,
          subsystem: state.subsystem,
          type: state.type,
          units: state.units
        }
      })
      .pipe(
        map(({ data: { updateState } }) => updateState)
      );
  }
}
