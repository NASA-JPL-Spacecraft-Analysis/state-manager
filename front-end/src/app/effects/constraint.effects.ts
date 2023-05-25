import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, merge, of, concat, EMPTY } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';

import { ConstraintActions, LayoutActions, ToastActions } from '../actions';
import { ConstraintService } from '../services';
import { mapToParam, ofRoute } from '../functions/router';
import { Constraint, ConstraintResponse } from '../models';
import { AppState } from '../app-store';

@Injectable()
export class ConstraintEffects {
  public createConstraint = createEffect(() =>
    this.actions.pipe(
      ofType(ConstraintActions.createConstraint),
      switchMap(({ constraint }) =>
        concat(
          this.constraintService.createConstraint(constraint).pipe(
            switchMap((createConstraint: ConstraintResponse) => [
              ConstraintActions.createConstraintSuccess({
                constraint: createConstraint.constraint
              }),
              ToastActions.showToast({
                message: createConstraint.message,
                toastType: 'success'
              })
            ]),
            catchError((error: Error) => [
              ConstraintActions.createConstraintFailure({
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

  public navConstraints = createEffect(() =>
    this.actions.pipe(
      ofRoute(['collection/:collectionId/constraints', 'collection/:collectionId/constraints/:id']),
      mapToParam<string>('collectionId'),
      withLatestFrom(this.store),
      map(([collectionId, store]) => ({ collectionId, store })),
      switchMap(({ collectionId, store }) =>
        merge(
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
          this.loadConstraints(collectionId, store.constraints.constraintMap),
          this.constraintService.getConstraintTypes().pipe(
            map((constraintTypes) =>
              ConstraintActions.setConstraintTypes({
                constraintTypes
              })
            ),
            catchError((error: Error) => [
              ConstraintActions.fetchConstraintTypesFailure({
                error
              })
            ])
          ),
          of(
            LayoutActions.isLoading({
              isLoading: false
            })
          )
        )
      )
    )
  );

  public navConstraintHistory = createEffect(() =>
    this.actions.pipe(
      ofRoute(['collection/:collectionId/constraint-history']),
      mapToParam<string>('collectionId'),
      withLatestFrom(this.store),
      map(([collectionId, store]) => ({ collectionId, store })),
      switchMap(({ collectionId, store }) =>
        merge(
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
          concat(
            store.constraints.constraintHistory
              ? this.constraintService.getConstraintHistory(collectionId).pipe(
                  map((constraintHistory) =>
                    ConstraintActions.setConstraintHistory({
                      constraintHistory
                    })
                  ),
                  catchError((error: Error) => [
                    ConstraintActions.fetchConstraintHistoryFailure({
                      error
                    })
                  ])
                )
              : EMPTY,
            of(
              LayoutActions.isLoading({
                isLoading: false
              })
            )
          )
        )
      )
    )
  );

  public updateConstraint = createEffect(() =>
    this.actions.pipe(
      ofType(ConstraintActions.updateConstraint),
      switchMap(({ constraint }) =>
        concat(
          this.constraintService.updateConstraint(constraint).pipe(
            switchMap((updateConstraint: ConstraintResponse) => [
              ConstraintActions.updateConstraintSuccess({
                constraint: updateConstraint.constraint
              }),
              ToastActions.showToast({
                message: updateConstraint.message,
                toastType: 'success'
              })
            ]),
            catchError((error: Error) => [
              ConstraintActions.updateConstraintFailure({
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
    private constraintService: ConstraintService,
    private store: Store<AppState>
  ) {}

  public loadConstraints(
    collectionId: string,
    constraintMap: Record<string, Constraint>
  ): Observable<Action> {
    if (!constraintMap) {
      return this.constraintService.getConstraints(collectionId).pipe(
        map((constraints) =>
          ConstraintActions.setConstraints({
            constraints
          })
        ),
        catchError((error: Error) => [
          ConstraintActions.fetchConstraintsFailure({
            error
          })
        ])
      );
    }

    return EMPTY;
  }
}
