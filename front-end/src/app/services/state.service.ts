import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StateResponse, StatesResponse, State, StateEnumeration, StateHistory, StateEnumerationUpload, Response, EnumerationsResponse, DeleteEnumerationsResponse } from '../models';

import * as gql from './gql/states';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(
    private apollo: Apollo
  ) {}

  public createState(state: State): Observable<StateResponse> {
    return this.apollo
      .mutate<{ createState: StateResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.CREATE_STATE,
        variables: {
          collectionId: state.collectionId,
          dataType: state.dataType,
          description: state.description,
          displayName: state.displayName,
          enumerations: state.enumerations,
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

  public createStates(collectionId: string, states: State[]): Observable<StatesResponse> {
    return this.apollo
      .mutate<{ createStates: StatesResponse }>({
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

  public deleteEnumerations(enumerationIds: string[], stateId: string): Observable<DeleteEnumerationsResponse> {
    return this.apollo
      .mutate<{ deleteEnumerations: DeleteEnumerationsResponse }>({
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

  public updateState(state: State): Observable<StateResponse> {
    return this.apollo
      .mutate<{ updateState: StateResponse }>({
        fetchPolicy: 'no-cache',
        mutation: gql.UPDATE_STATE,
        variables: {
          dataType: state.dataType,
          description: state.description,
          displayName: state.displayName,
          enumerations: state.enumerations,
          externalLink: state.externalLink,
          id: state.id,
          identifier: state.identifier,
          source: state.source,
          subsystem: state.subsystem,
          type: state.type,
          units: state.units
        }
      })
      .pipe(map(({ data: { updateState } }) => {
        if (!updateState.success) {
          throw new Error(updateState.message);
        }

        return updateState;
      }));
  }
}
