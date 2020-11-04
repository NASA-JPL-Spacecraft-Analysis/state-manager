import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { State, StateMap, StateEnumeration, StateEnumerationMap, StateHistory, StateEnumerationUpload } from '../models';
import { addCollectionId, setFormData } from './service-utils';

import * as gql from './gql';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(
    private apollo: Apollo
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
      .pipe(map(({ data: { createState } }) => createState));
  }

  public createStates(collectionId: number, states: State[]): Observable<State[]> {
    return this.apollo
      .mutate<{ createStates: State[] }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_STATES,
        variables: {
          collection_id: collectionId,
          states
        }
      })
      .pipe(map(({ data: { createStates } }) => createStates));
  }

  public deleteEnumerations(enumerationIds: number[], stateId: number): Observable<boolean> {
    return this.apollo
      .mutate<{ deleteEnumerations: boolean }>({
        fetchPolicy: 'no-cache',
        mutation: gql.DELETE_ENUMERATIONS,
        variables: {
          enumerationIds,
          state_id: stateId
        }
      })
      .pipe(map(({ data: { deleteEnumerations } }) => deleteEnumerations));
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

  public saveEnumerations(
    collectionId: number,
    enumerations: StateEnumeration[] | StateEnumerationUpload[]
  ): Observable<StateEnumeration[]> {
    return this.apollo
      .mutate<{ saveEnumerations: StateEnumeration[] }>({
        fetchPolicy: 'no-cache',
        mutation: gql.SAVE_ENUMERATIONS,
        variables: {
          collection_id: collectionId,
          enumerations
        }
      })
      .pipe(map(({ data: { saveEnumerations } }) => saveEnumerations));
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
