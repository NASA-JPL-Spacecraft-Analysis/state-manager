import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Observable, merge, of, EMPTY } from 'rxjs';

import { StateService } from '../services';
import { ToastActions, StateActions, CollectionActions, LayoutActions } from '../actions';
import { ofRoute, mapToParam } from '../functions/router';
import { CreateStateResponse } from '../models';

@Injectable()
export class StateEffects {
  public createState = createEffect(() =>
    this.actions.pipe(
      ofType(StateActions.createState),
      switchMap(({ collectionId, state: newState }) =>
        this.stateService.createState(
          collectionId,
          newState
        ).pipe(
          switchMap((createState: CreateStateResponse) => [
            LayoutActions.toggleSidenav({
              showSidenav: false
            }),
            StateActions.createStateSuccess({
              state: createState.state
            }),
            StateActions.saveEnumerations({
              collectionId,
              stateId: createState.state.id,
              enumerations: newState.enumerations
            }),
            ToastActions.showToast({
              message: createState.message,
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => [
            StateActions.createStateFailure({
              error
            }),
            ToastActions.showToast({
              message: error.message,
              toastType: 'error'
            })
          ])
        )
      )
    )
  );

  public deleteEnumerations = createEffect(() =>
    this.actions.pipe(
      ofType(StateActions.deleteEnumerations),
      switchMap(({ deletedEnumerationIds, stateId}) =>
        this.stateService.deleteEnumerations(
          deletedEnumerationIds,
          stateId
        ).pipe(
          switchMap((deleteEnumerations) => [
            StateActions.deleteEnumerationsSuccess({
              deletedEnumerationIds
            }),
            ToastActions.showToast({
              message: deleteEnumerations.message,
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => [
            StateActions.deleteEnumerationsFailure({
              error
            }),
            ToastActions.showToast({
              message: error.message,
              toastType: 'error'
            })
          ])
        )
      )
    )
  );

  public navStates = createEffect(() =>
    this.actions.pipe(
      ofRoute([ 'collection/:collectionId/states', 'collection/:collectionId/state-history' ]),
      mapToParam<string>('collectionId'),
      switchMap(collectionId =>
        this.getStates(collectionId)
      )
    )
  );

  public navStatesByCollectionId = createEffect(() =>
    this.actions.pipe(
      ofType(CollectionActions.setSelectedCollection),
      switchMap(({ id }) => {
        if (id !== null) {
          return this.getStates(id);
        }

        return [];
      })
    )
  );

  public saveEnumerations = createEffect(() =>
    this.actions.pipe(
      ofType(StateActions.saveEnumerations),
      switchMap(({ collectionId, stateId, enumerations }) => {
        const saveEnumerations = [];

        for (const enumeration of enumerations) {
          let id: string | undefined;

          if (enumeration.id) {
            id = enumeration.id;
          }

          saveEnumerations.push(
            {
              id,
              label: enumeration.label.toString(),
              stateId,
              value: enumeration.value.toString()
            }
          );
        }

        return this.stateService.saveEnumerations(
          collectionId,
          saveEnumerations
        ).pipe(
          switchMap((saveEnumerations) => [
            StateActions.saveEnumerationsSuccess({
              enumerations: saveEnumerations.enumerations,
              stateId
            }),
            ToastActions.showToast({
              message: saveEnumerations.message,
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => [
            StateActions.saveEnumerationsFailure({
              error
            }),
            ToastActions.showToast({
              message: error.message,
              toastType: 'error'
            })
          ])
        );
      })
    )
  );

  public updateState = createEffect(() =>
    this.actions.pipe(
      ofType(StateActions.updateState),
      switchMap(({ updatedState }) =>
        this.stateService.updateState(
          updatedState
        ).pipe(
          switchMap((state) => [
            StateActions.updateStateSuccess({
              state: {
                ...updatedState,
                id: state.id
              }
            }),
            ToastActions.showToast({
              message: 'State updated',
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => [
            StateActions.updateStateFailure({ error }),
            ToastActions.showToast({
              message: 'State updating failed',
              toastType: 'error'
            })
          ])
        )
      )
    )
  );

  constructor(
    private actions: Actions,
    private router: Router,
    private stateService: StateService
  ) {}

  private getStates(collectionId: string): Observable<Action> {
    const url = this.router.routerState.snapshot.url.split('/').pop();

    if (url === 'states') {
      return merge(
        of(LayoutActions.toggleSidenav({
          showSidenav: false
        })),
        this.stateService.getStates(
          collectionId
        ).pipe(
          map(states => StateActions.setStates({
            states
          })),
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
          map(states => StateActions.setStates({
            states
          })),
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
