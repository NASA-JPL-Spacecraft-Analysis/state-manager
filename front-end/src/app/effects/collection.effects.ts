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
        const route = this.router.url.split('/').pop();
        let collectionId = null;

        // Search our URL for a valid collectionId.
        for (const splitUrl of this.router.url.split('/')) {
          if (keys.includes(splitUrl)) {
            collectionId = Number(splitUrl);
          }
        }

        if (keys.length > 0) {
          // If the user is going directly to a URL with a collectionId, go there.
          if (collectionId && keys.includes(String(collectionId))) {
            if (route) {
              this.router.navigate([ 'collection/' + collectionId + '/' + route ]);
            } else {
              this.router.navigate([ 'collection/' + collectionId ]);
            }

            return [
              CollectionActions.setSelectedCollection({
                id: collectionId
              })
            ];
          } else {
            // Navigate to the first collection we come across.
            this.router.navigate([ 'collection/' + keys[0] ]);

            return [
              CollectionActions.setSelectedCollection({
                id: Number(keys[0])
              })
            ];
          }
        }

        // TODO: We need to handle what happens if there aren't any collections.
        return [];
      })
    );
  });
}
