import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';

import { StateService } from '../services';
import { ToastActions, StateActions, CollectionActions, LayoutActions } from '../actions';
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
            LayoutActions.toggleSidenav({
              showSidenav: false
            }),
            StateActions.createStateSuccess({
              state: {
                ...newState,
                id: state.id
              }
            }),
            StateActions.saveEnumerations({
              collectionId,
              stateId: newState.id,
              enumerations: newState.enumerations
            }),
            ToastActions.showToast({
              message: 'State created',
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => [
            StateActions.createStateFailure({
              error
            }),
            ToastActions.showToast({
              message: 'State creation failed',
              toastType: 'error'
            })
          ])
        )
      )
    );
  });

  public deleteEnumerations = createEffect(() => {
    return this.actions.pipe(
      ofType(StateActions.deleteEnumerations),
      switchMap(({ deletedEnumerationIds, stateId}) =>
        this.stateService.deleteEnumerations(
          deletedEnumerationIds,
          stateId
        ).pipe(
          switchMap((deleteEnumerations) => [
            StateActions.deleteEnumerationsSuccess({
              deletedEnumerationIds
            })
          ]),
          catchError((error: Error) => [
            StateActions.deleteEnumerationsFailure({
              error
            })
          ])
        )
      )
    );
  });

  public navStates = createEffect(() => {
    return this.actions.pipe(
      ofRoute([ 'collection/:collectionId/states', 'collection/:collectionId/state-history' ]),
      mapToParam<number>('collectionId'),
      switchMap(collectionId =>
        this.getStates(Number(collectionId))
      )
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
      switchMap(({ collectionId, stateId, enumerations }) => {
        const saveEnumerations = [];

        // TODO: Track down where the IDs are changing... This format will change after rename fields in backend.
        stateId = Number(stateId);

        for (const enumeration of enumerations) {
          let id: number | undefined;

          if (enumeration.id) {
            id = Number(enumeration.id);
          }

          saveEnumerations.push(
            {
              id,
              label: enumeration.label.toString(),
              state_id: Number(stateId),
              value: enumeration.value.toString()
            }
          );
        }

        return this.stateService.saveEnumerations(
          collectionId,
          saveEnumerations
        ).pipe(
          switchMap((savedEnumerations) => [
            StateActions.saveEnumerationsSuccess({
              enumerations: savedEnumerations,
              stateId
            })
          ]),
          catchError((error: Error) => [
            StateActions.saveEnumerationsFailure({
              error
            }),
            ToastActions.showToast({
              message: 'State enumeration save failed',
              toastType: 'error'
            })
          ])
        );
      })
    );
  });

  public updateState = createEffect(() => {
    return this.actions.pipe(
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
