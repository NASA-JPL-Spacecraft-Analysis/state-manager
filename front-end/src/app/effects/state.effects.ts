import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { Observable, merge, of, concat, EMPTY } from 'rxjs';

import { StateService } from '../services';
import { ToastActions, StateActions, LayoutActions, FileExportActions } from '../actions';
import { ofRoute, mapToParam } from '../functions/router';
import { State, StateEnumerationMap, StateResponse } from '../models';
import { AppState } from '../app-store';
import { FileGenerationService } from '../services/file-generation.service';

@Injectable()
export class StateEffects {
  public createState = createEffect(() =>
    this.actions.pipe(
      ofType(StateActions.createState),
      switchMap(({ state }) =>
        concat(
          this.stateService.createState(state).pipe(
            switchMap((createState: StateResponse) => [
              StateActions.createStateSuccess({
                state: createState.state
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
          ),
          of(LayoutActions.isSaving({ isSaving: false }))
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

  public exportStates = createEffect(() =>
    this.actions.pipe(
      ofType(FileExportActions.exportStates),
      switchMap(({ states, fileType }) => {
        this.fileGenerationService.generateFile(states, fileType, 'states');

        return [
          ToastActions.showToast({
            message: `Generating states.${fileType} for download...`,
            toastType: 'success'
          })
        ];
      })
    )
  );

  public navStates = createEffect(() =>
    this.actions.pipe(
      ofRoute(['collection/:collectionId/states', 'collection/:collectionId/states/:id']),
      mapToParam<string>('collectionId'),
      withLatestFrom(this.store),
      map(([collectionId, store]) => ({ collectionId, store })),
      switchMap(({ collectionId, store }) => {
        const actions = merge(
          of(
            LayoutActions.toggleSidenav({
              showSidenav: false
            })
          ),
          of(
            LayoutActions.isLoading({
              isLoading: true
            })
          )
        );

        return merge(
          actions,
          concat(
            this.loadStates(collectionId, store.states.stateMap),
            this.loadStateEnumerations(collectionId, store.states.stateEnumerationMap),
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
          )
        );
      })
    )
  );

  public navStateEnumerationHistory = createEffect(() =>
    this.actions.pipe(
      ofRoute(['collection/:collectionId/state-enumeration-history']),
      mapToParam<string>('collectionId'),
      withLatestFrom(this.store),
      map(([collectionId, store]) => ({ collectionId, store })),
      switchMap(({ collectionId, store }) => {
        const actions = merge(
          of(
            LayoutActions.toggleSidenav({
              showSidenav: false
            })
          )
        );

        if (!store.states.stateEnumerationHistory) {
          return merge(
            actions,
            of(
              LayoutActions.isLoading({
                isLoading: true
              })
            ),
            this.getStateEnumerationHistory(collectionId)
          );
        }

        return merge(
          actions,
          of(
            LayoutActions.isLoading({
              isLoading: false
            })
          )
        );
      })
    )
  );

  public navStateHistory = createEffect(() =>
    this.actions.pipe(
      ofRoute(['collection/:collectionId/state-history']),
      mapToParam<string>('collectionId'),
      withLatestFrom(this.store),
      map(([collectionId, store]) => ({ collectionId, store })),
      switchMap(({ collectionId, store }) => {
        const actions = merge(
          of(
            LayoutActions.toggleSidenav({
              showSidenav: false
            })
          ),
          of(
            LayoutActions.isLoading({
              isLoading: true
            })
          )
        );

        if (!store.states.stateHistoryMap) {
          return merge(
            actions,
            concat(
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
            )
          );
        }

        return merge(
          actions,
          of(
            LayoutActions.isLoading({
              isLoading: false
            })
          )
        );
      })
    )
  );

  public updateState = createEffect(() =>
    this.actions.pipe(
      ofType(StateActions.updateState),
      switchMap(({ state }) =>
        concat(
          this.stateService.updateState(state).pipe(
            switchMap((updateState: StateResponse) => [
              StateActions.updateStateSuccess({
                state: updateState.state
              }),
              ToastActions.showToast({
                message: updateState.message,
                toastType: 'success'
              })
            ]),
            catchError((error: Error) => [
              StateActions.updateStateFailure({
                error
              }),
              ToastActions.showToast({
                message: error.message,
                toastType: 'error'
              })
            ])
          ),
          of(LayoutActions.isSaving({ isSaving: false }))
        )
      )
    )
  );

  constructor(
    private actions: Actions,
    private fileGenerationService: FileGenerationService<State>,
    private stateService: StateService,
    private store: Store<AppState>
  ) {}

  public loadStates(collectionId: string, stateMap: Record<string, State>): Observable<Action> {
    if (!stateMap) {
      return this.stateService.getStates(collectionId).pipe(
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
      );
    }

    return EMPTY;
  }

  public loadStateEnumerations(
    collectionId: string,
    stateEnumerationMap: StateEnumerationMap
  ): Observable<Action> {
    if (!stateEnumerationMap) {
      return this.stateService.getStateEnumerations(collectionId).pipe(
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
      );
    }

    return EMPTY;
  }

  private getStateEnumerationHistory(collectionId: string): Observable<Action> {
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
