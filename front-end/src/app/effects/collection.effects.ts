import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

import { CollectionActions } from '../actions';

@Injectable()
export class CollectionEffects {
  constructor(
    private actions: Actions,
    private router: Router
  ) {}

  public fetchCollectionsSuccess = createEffect(() => {
    return this.actions.pipe(
      ofType(CollectionActions.fetchCollectionsSuccess),
      switchMap(({ collectionMap }) => {
        const keys = Object.keys(collectionMap);

        if (keys.length > 0) {
          // Navigate to the first collection we come across.
          this.router.navigate([ 'collection/' + keys[0] ]);

          return [
            CollectionActions.setSelectedCollection({
              id: Number(keys[0])
            })
          ];
        }

        // TODO: We need to handle what happens if there aren't any collections.
        return [];
      })
    );
  });
}
