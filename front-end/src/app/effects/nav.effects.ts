import { Injectable } from '@angular/core';
import { Actions, createEffect, ROOT_EFFECTS_INIT, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import { CollectionService } from '../services';
import { CollectionActions } from '../actions';

@Injectable()
export class NavEffects {
  constructor(
    private actions: Actions,
    private collectionService: CollectionService
  ) {}

  public effectsInit = createEffect(() =>
    this.actions.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(_ =>
        this.collectionService.getCollections().pipe(
          map(collections => CollectionActions.fetchCollectionsSuccess({
            collections
          })),
          catchError(
            (error: Error) => [
              CollectionActions.fetchCollectionsFailure({
                error
              })
            ]
          )
        )
      )
    )
  );
}
