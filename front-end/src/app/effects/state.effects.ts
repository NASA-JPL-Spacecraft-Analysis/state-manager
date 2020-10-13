import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';

import { StateService } from '../services';
import { ToastActions, StateActions, CollectionActions, LayoutActions } from '../actions';
import { State } from '../models';
import { Observable, merge, of, EMPTY } from 'rxjs';
import { ofRoute, mapToParam } from '../functions/router';

@Injectable()
export class StateEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private stateService: StateService
  ) {}

  public createState = createEffect(() => {
    return this.actions.pipe(
      ofType(StateActions.createState),
      switchMap(({ collectionId, state: newState }) =>
        this.stateService.createState(
          collectionId,
          newState
        ).pipe(
          switchMap((state) => [
            StateActions.createStateSuccess({
              state: {
                ...newState,
                id: state.id
              }
            }),
            /*
            StateActions.saveEnumerations({
              collectionId,
              stateId: id,
              enumerations: stateEnumerations,
            }),
            */
            ToastActions.showToast({
              message: 'State created',
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => {
            console.log(error);
            return [
              StateActions.createStateFailure({
                error
              }),
              ToastActions.showToast({
                message: 'State creation failed',
                toastType: 'error'
              })
            ];
          })
        )
      )
    );
  });

  public editState = createEffect(() => {
    return this.actions.pipe(
      ofType(StateActions.editState),
      switchMap(({ collectionId, state }) =>
        this.stateService.editState(
          collectionId,
          state
        ).pipe(
          switchMap(
            (editedState: State) => [
              StateActions.editStateSuccess({
                state: editedState
              }),
              ToastActions.showToast({
                message: 'State edited',
                toastType: 'success'
              })
            ]
          ),
          catchError(
            (error: Error) => [
              StateActions.editStateFailure({ error }),
              ToastActions.showToast({
                message: 'State editing failed',
                toastType: 'error'
              })
            ]
          )
        )
      )
    );
  });

  public navStates = createEffect(() => {
    return this.actions.pipe(
      ofRoute([ 'collection/:collectionId/states', 'collection/:collectionId/state-history' ]),
      mapToParam<number>('collectionId'),
      switchMap(collectionId => {
        return this.getStates(Number(collectionId));
      })
    );
  });

  public navStatesByCollectionId = createEffect(() => {
    return this.actions.pipe(
      ofType(CollectionActions.setSelectedCollection),
      switchMap(({ id }) => {
        if (id !== null) {
          return this.getStates(id);
        }

        return [];
      })
    );
  });

  public saveEnumerations = createEffect(() => {
    return this.actions.pipe(
      ofType(StateActions.saveEnumerations),
      switchMap(({ collectionId, stateId, enumerations }) =>
        this.stateService.saveEnumerations(
          collectionId,
          stateId,
          enumerations
        ).pipe(
          switchMap((savedEnumerations) => {
            return [
              StateActions.saveEnumerationsSuccess({
                enumerations: savedEnumerations
              })
            ];
          }),
          catchError(
            (error: Error) => [
              StateActions.saveEnumerationsFailure({ error })
            ]
          )
        )
      )
    );
  });

  private getStates(collectionId: number): Observable<Action> {
    const url = this.router.routerState.snapshot.url.split('/').pop();

    if (url === 'states') {
      return merge(
        of(LayoutActions.toggleSidenav({
          showSidenav: false
        })),
        this.stateService.getStates(
          collectionId
        ).pipe(
          switchMap(({ states }) => [
            StateActions.setStates({
              states
            })
          ]),
          catchError(
            (error: Error) => [
              StateActions.fetchStatesFailure({
                error
              })
            ]
          )
        )
      );
    } else if (url === 'state-history') {
      return merge(
        of(LayoutActions.toggleSidenav({
          showSidenav: false
        })),
        this.stateService.getStateHistory(
          collectionId
        ).pipe(
          map(stateHistory => StateActions.setStateHistory({
            stateHistory
          })),
          catchError(
            (error: Error) => [
              StateActions.fetchStateHistoryFailure({
                error
              })
            ]
          )
        ),
        this.stateService.getStates(
          collectionId
        ).pipe(
          switchMap(({ states }) => [
            StateActions.setStates({
              states
            })
          ]),
          catchError(
            (error: Error) => [
              StateActions.fetchStatesFailure({
                error
              })
            ]
          )
        )
      );
    }

    return EMPTY;
  }
}
