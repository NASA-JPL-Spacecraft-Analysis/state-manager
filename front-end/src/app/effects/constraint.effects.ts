import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, EMPTY, merge, of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';

import { CollectionActions, ConstraintActions, LayoutActions } from '../actions';
import { ConstraintService } from '../services';
import { AppState } from '../app-store';
import { ofRoute } from '../functions/router';

@Injectable()
export class ConstraintEffects {
  public getConstraintsByCollectionId = createEffect(() =>
    this.actions.pipe(
      ofRoute([ 'collection/:collectionId/constraints', 'collection/:collectionId/constraint-history' ]),
      withLatestFrom(this.store),
      map(([_, state]) => state),
      switchMap(state => {
        if (state.collection.selectedCollectionId) {
          return this.getConstraints(state.collection.selectedCollectionId);
        }

        return [];
      })
    )
  );

  public getEventByCollectionId = createEffect(() =>
    this.actions.pipe(
      ofType(CollectionActions.setSelectedCollection),
      switchMap(({ id }) => {
        if (id !== null) {
          return this.getConstraints(id);
        }

        return [];
      })
    )
  );

  constructor(
    private actions: Actions,
    private constraintService: ConstraintService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  private getConstraints(collectionId: string): Observable<Action> {
    const url = this.router.routerState.snapshot.url.split('/').pop();

    if (url === 'constraints') {
      return merge(
        of(LayoutActions.toggleSidenav({
          showSidenav: false
        })),
        this.constraintService.getConstraints(
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
        )
      )
    }

    return EMPTY;
  }
}
