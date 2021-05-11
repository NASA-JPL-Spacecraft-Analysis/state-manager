import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CreateStateResponse, CreateStatesResponse, State, StateEnumeration, StateHistory, StateEnumerationUpload, Response, SaveEnumerationsResponse } from '../models';

import * as gql from './gql';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(
    private apollo: Apollo
  ) {}

  public createState(collectionId: string, state: State): Observable<CreateStateResponse> {
    return this.apollo
      .mutate<{ createState: CreateStateResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_STATE,
        variables: {
          collectionId,
          dataType: state.dataType,
          description: state.description,
          displayName: state.displayName,
          externalLink: state.externalLink,
          identifier: state.identifier,
          source: state.source,
          subsystem: state.subsystem,
          type: state.type,
          units: state.units
        }
      })
      .pipe(map(({ data: { createState } }) => {
        if (!createState.success) {
          throw new Error(createState.message);
        }

        return createState;
      }));
  }

  public createStates(collectionId: string, states: State[]): Observable<CreateStatesResponse> {
    return this.apollo
      .mutate<{ createStates: CreateStatesResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_STATES,
        variables: {
          collectionId,
          states
        }
      })
      .pipe(map(({ data: { createStates } }) => {
        if (!createStates.success) {
          throw new Error(createStates.message);
        }

        return createStates;
      }));
  }

  public deleteEnumerations(enumerationIds: string[], stateId: string): Observable<Response> {
    return this.apollo
      .mutate<{ deleteEnumerations: Response }>({
        fetchPolicy: 'no-cache',
        mutation: gql.DELETE_ENUMERATIONS,
        variables: {
          enumerationIds,
          stateId
        }
      })
      .pipe(map(({ data: { deleteEnumerations } }) => {
        if (!deleteEnumerations.success) {
          throw new Error(deleteEnumerations.message);
        }

        return deleteEnumerations;
      }));
  }

  /**
   * TODO: Figure out a way to exclude enumerations for when we query for states on the relationships page.
   */
  public getStates(collectionId: string): Observable<State[]> {
    return this.apollo
      .query<{ states: State[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_STATES,
        variables: {
          collectionId
        }
      })
      .pipe(map(({ data: { states } }) => states));
  }

  public getStateHistory(collectionId: string): Observable<StateHistory[]> {
    return this.apollo
      .query<{ stateHistory: StateHistory[] }>({
        fetchPolicy: 'no-cache',
        query: gql.GET_STATE_HISTORY,
        variables: {
          collectionId
        }
      })
      .pipe(map(({ data: { stateHistory } }) => stateHistory));
  }

  public saveEnumerations(
    collectionId: string,
    enumerations: StateEnumeration[] | StateEnumerationUpload[]
  ): Observable<SaveEnumerationsResponse> {
    return this.apollo
      .mutate<{ saveEnumerations: SaveEnumerationsResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.SAVE_ENUMERATIONS,
        variables: {
          collectionId,
          enumerations
        }
      })
      .pipe(map(({ data: { saveEnumerations } }) => {
        if (!saveEnumerations.success) {
          throw new Error(saveEnumerations.message);
        }

        return saveEnumerations;
      }));
  }

  public updateState(state: State): Observable<State> {
    return this.apollo
      .mutate<{ updateState: State }>({
        fetchPolicy: 'no-cache',
        mutation: gql.UPDATE_STATE,
        variables: {
          description: state.description,
          displayName: state.displayName,
          id: state.id,
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
