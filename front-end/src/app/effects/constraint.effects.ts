import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, merge, of, concat } from 'rxjs';
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
      ofRoute([
        'collection/:collectionId/constraints',
        'collection/:collectionId/constraints/',
        'collection/:collectionId/constraints/:id',
        'collection/:collectionId/constraint-history'
      ]),
      mapToParam<string>('collectionId'),
      switchMap((collectionId) => {
        const url = this.router.routerState.snapshot.url.split('/').pop();
        let history = false;

        if (url === 'constraint-history') {
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
          this.getConstraints(collectionId, history)
        );
      })
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
    private router: Router
  ) {}

  public getConstraints(collectionId: string, history: boolean): Observable<Action> {
    if (!history) {
      return concat(
        this.constraintService.getConstraints(collectionId).pipe(
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
        ),
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
        of(LayoutActions.isLoading({ isLoading: false }))
      );
    } else {
      return concat(
        this.constraintService.getConstraintHistory(collectionId).pipe(
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
        ),
        of(LayoutActions.isLoading({ isLoading: false }))
      );
    }
  }
}
