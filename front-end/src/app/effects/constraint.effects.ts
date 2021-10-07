import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, merge, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { ConstraintActions, LayoutActions, ToastActions } from '../actions';
import { ConstraintService } from '../services';
import { mapToParam, ofRoute } from '../functions/router';
import { ConstraintResponse } from '../models';

@Injectable()
export class ConstraintEffects {
  public createConstraint = createEffect(() =>
    this.actions.pipe(
      ofType(ConstraintActions.createConstraint),
      switchMap(({ constraint }) =>
        this.constraintService.createConstraint(
          constraint
        ).pipe(
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
        )
      )
    )
  );

  public navConstraints = createEffect(() =>
    this.actions.pipe(
      ofRoute([
        'collection/:collectionId/constraints',
        'collection/:collectionId/constraint-history'
      ]),
      mapToParam<string>('collectionId'),
      switchMap(collectionId => {
        let history = true;

        if (this.router.routerState.snapshot.url.split('/').pop() === 'constraints') {
          history = false;
        }

        return merge(
          of(LayoutActions.toggleSidenav({
            showSidenav: false
          })),
          this.getConstraints(collectionId, history)
        );
      })
    )
  );

  public updateConstraint = createEffect(() =>
    this.actions.pipe(
      ofType(ConstraintActions.updateConstraint),
      switchMap(({ constraint }) =>
        this.constraintService.updateConstraint(
          constraint
        ).pipe(
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
        )
      )
    )
  );

  constructor(
    private actions: Actions,
    private constraintService: ConstraintService,
    private router: Router
  ) {}

  public getConstraints(collectionId: string, history: boolean): Observable<Action> {
    if (!history) {
      return this.constraintService.getConstraints(
        collectionId
      ).pipe(
        map(constraints => ConstraintActions.setConstraints({
          constraints
        })),
        catchError(
          (error: Error) => [
            ConstraintActions.fetchConstraintsFailure({
              error
            })
          ]
        )
      );
    } else {
      return this.constraintService.getConstraintHistory(
        collectionId
      ).pipe(
        map(constraintHistory => ConstraintActions.setConstraintHistory({
          constraintHistory
        })),
        catchError(
          (error: Error) => [
            ConstraintActions.fetchConstraintHistoryFailure({
              error
            })
          ]
        )
      );
    }
  }
}
