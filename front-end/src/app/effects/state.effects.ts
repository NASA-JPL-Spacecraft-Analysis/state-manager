import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Observable, merge, of, concat } from 'rxjs';

import { StateService } from '../services';
import { ToastActions, StateActions, LayoutActions } from '../actions';
import { ofRoute, mapToParam } from '../functions/router';
import { StateResponse } from '../models';
import { isLoading, isSaving } from '../actions/layout.actions';

@Injectable()
export class StateEffects {
  public createState = createEffect(() =>
    this.actions.pipe(
      ofType(StateActions.createState),
      switchMap(({ state }) =>
        this.stateService.createState(state).pipe(
          switchMap((createState: StateResponse) => [
            StateActions.createStateSuccess({
              state: createState.state
            }),
            ToastActions.showToast({
              message: createState.message,
              toastType: 'success'
            }),
            isSaving({ isSaving: false })
          ]),
          catchError((error: Error) => [
            StateActions.createStateFailure({
              error
            }),
            ToastActions.showToast({
              message: error.message,
              toastType: 'error'
            }),
            isSaving({ isSaving: false })
          ])
        )
      )
    )
  );

  public deleteEnumerations = createEffect(() =>
    this.actions.pipe(
      ofType(StateActions.deleteEnumerations),
      switchMap(({ deletedEnumerationIds, stateId }) =>
        this.stateService.deleteEnumerations(deletedEnumerationIds, stateId).pipe(
          switchMap((deleteEnumerations) => [
            StateActions.deleteEnumerationsSuccess({
              deletedEnumerationIds: deleteEnumerations.deletedEnumerationIds
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
      ofRoute([
        'collection/:collectionId/state-enumeration-history',
        'collection/:collectionId/states',
        'collection/:collectionId/states/',
        'collection/:collectionId/states/:id',
        'collection/:collectionId/state-history'
      ]),
      mapToParam<string>('collectionId'),
      switchMap((collectionId) => {
        const url = this.router.routerState.snapshot.url.split('/').pop();
        let history = false;

        if (url === 'state-enumeration-history') {
          return merge(
            of(
              LayoutActions.toggleSidenav({
                showSidenav: false
              })
            ),
            of(
              LayoutActions.isLoading({
                isLoading: true
              })
            ),
            this.getStateEnumerationHistory(collectionId)
          );
        }

        if (url === 'state-history') {
          history = true;
        }

        return merge(
          of(
            LayoutActions.toggleSidenav({
              showSidenav: false
            })
          ),
          of(
            LayoutActions.isLoading({
              isLoading: true
            })
          ),
          this.getStates(collectionId, history)
        );
      })
    )
  );

  public updateState = createEffect(() =>
    this.actions.pipe(
      ofType(StateActions.updateState),
      switchMap(({ state }) =>
        this.stateService.updateState(state).pipe(
          switchMap((updateState: StateResponse) => [
            StateActions.updateStateSuccess({
              state: updateState.state
            }),
            ToastActions.showToast({
              message: updateState.message,
              toastType: 'success'
            }),
            isSaving({ isSaving: false })
          ]),
          catchError((error: Error) => [
            StateActions.updateStateFailure({
              error
            }),
            ToastActions.showToast({
              message: error.message,
              toastType: 'error'
            }),
            isSaving({ isSaving: false })
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

  public getStates(collectionId: string, history: boolean): Observable<Action> {
    if (!history) {
      return concat(
        this.stateService.getStateEnumerations(collectionId).pipe(
          map((stateEnumerations) =>
            StateActions.setStateEnumerations({
              stateEnumerations
            })
          ),
          catchError((error: Error) => [
            StateActions.fetchStateEnumerationsFailure({
              error
            })
          ])
        ),
        this.stateService.getStates(collectionId).pipe(
          map((states) =>
            StateActions.setStates({
              states
            })
          ),
          catchError((error: Error) => [
            StateActions.fetchStatesFailure({
              error
            })
          ])
        ),
        this.stateService.getStateTypes().pipe(
          map((stateTypes) =>
            StateActions.setStateTypes({
              stateTypes
            })
          ),
          catchError((error: Error) => [
            StateActions.fetchStateTypesFailure({
              error
            })
          ])
        ),
        of(LayoutActions.isLoading({ isLoading: false }))
      );
    } else {
      return concat(
        this.stateService.getStateHistory(collectionId).pipe(
          map((stateHistory) =>
            StateActions.setStateHistory({
              stateHistory
            })
          ),
          catchError((error: Error) => [
            StateActions.fetchStateHistoryFailure({
              error
            })
          ])
        ),
        of(LayoutActions.isLoading({ isLoading: false }))
      );
    }
  }

  public getStateEnumerationHistory(collectionId: string): Observable<Action> {
    return concat(
      this.stateService.getStateEnumerationHistory(collectionId).pipe(
        map((stateEnumerationHistory) =>
          StateActions.setStateEnumerationHistory({
            stateEnumerationHistory
          })
        ),
        catchError((error: Error) => [
          StateActions.fetchStateEnumerationHistoryFailure({
            error
          })
        ])
      ),
      of(LayoutActions.isLoading({ isLoading: false }))
    );
  }
}
