import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material/dialog';
import { switchMap, map, withLatestFrom, catchError } from 'rxjs/operators';

import { CollectionActions, ToastActions } from '../actions';
import { CollectionService } from '../services';
import { Collection } from '../models';
import { of, forkJoin, concat } from 'rxjs';
import { ConfirmationDialogComponent } from '../components';
import { AppState } from '../app-store';

@Injectable()
export class CollectionEffects {
  public createCollection = createEffect(() =>
    this.actions.pipe(
      ofType(CollectionActions.createCollection),
      switchMap(({ name }) =>
        this.collectionService.createCollection(
          name
        ).pipe(
          switchMap((createCollection: Collection) => [
            CollectionActions.createCollectionSuccess({
              collection: createCollection
            }),
            CollectionActions.setSelectedCollection({
              id: createCollection.id
            }),
            ToastActions.showToast({
              message: 'Collection created',
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => [
            CollectionActions.createCollectionFailure({
              error
            }),
            ToastActions.showToast({
              message: 'Collection creation failed',
              toastType: 'error'
            })
          ])
        )
      )
    )
  );

  public deleteCollection = createEffect(() =>
    this.actions.pipe(
      ofType(CollectionActions.deleteCollection),
      switchMap(({ id, name }) => {
        const dialog = this.dialog.open(
          ConfirmationDialogComponent,
          {
            data: {
              confirmButtonColor: '#dc4545',
              confirmButtonText: 'Delete',
              message: 'You can recover your data by contacting FSPA support.',
              title: 'Delete collection "' + name + '"?'
            }
          }
        );
        return forkJoin([
          of(id),
          dialog.afterClosed(),
        ]);
      }),
      map(([ id, result ]) => ({
        id,
        result
      })),
      switchMap(({ id, result }) => {
        if (result) {
          return concat(
            this.collectionService.deleteCollection(
              id
            ).pipe(
              switchMap(
                (deleteCollection: boolean) => [
                  CollectionActions.deleteCollectionSuccess({
                    id
                  }),
                  CollectionActions.setSelectedCollection({
                    id: null
                  }),
                  ToastActions.showToast({
                    message: 'Collection deleted',
                    toastType: 'success'
                  })
                ]
              ),
              catchError((error: Error) => [
                CollectionActions.deleteCollectionFailure({
                  error
                }),
                ToastActions.showToast({
                  message: 'Collection deletion failed',
                  toastType: 'error'
                })
              ])
            )
          );
        }

        return [
          CollectionActions.setSelectedCollection({
            id: null
          }),
          CollectionActions.setSelectedCollection({
            id
          })
        ];
      })
    )
  );

  public updateCollection = createEffect(() =>
    this.actions.pipe(
      ofType(CollectionActions.updateCollection),
      switchMap(({ collectionId, name }) =>
        this.collectionService.updateCollection(
          collectionId,
          name
        ).pipe(
          switchMap((updateCollection: Collection) => [
            CollectionActions.updateCollectionSuccess({
              collection: updateCollection
            }),
            ToastActions.showToast({
              message: 'Collection edited',
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => [
            CollectionActions.updateCollectionFailure({
              error
            }),
            ToastActions.showToast({
              message: 'Collection update failed',
              toastType: 'error'
            })
          ])
        )
      )
    )
  );

  public fetchCollectionsSuccess = createEffect(() =>
    this.actions.pipe(
      ofType(CollectionActions.fetchCollectionsSuccess),
      switchMap(({ collections }) => {
        const keys = [];
        let collectionId: string = null;

        for (const collection of collections) {
          keys.push(collection.id);
        }

        // Search our URL for a valid collectionId.
        for (const splitUrl of this.router.url.split('/')) {
          if (keys.includes(splitUrl)) {
            collectionId = splitUrl;
          }
        }

        if (keys.length > 0) {
          if (collectionId && keys.includes(String(collectionId))) {
            return [
              CollectionActions.setSelectedCollection({
                id: collectionId
              })
            ];
          } else {
            return [
              CollectionActions.setSelectedCollection({
                id: keys[0]
              })
            ];
          }
        }

        return [];
      })
    )
  );

  public setSelectedCollection = createEffect(() =>
    this.actions.pipe(
      ofType(CollectionActions.setSelectedCollection),
      withLatestFrom(this.store),
      map(([action, state]) => ({ action, state })),
      switchMap(({ action, state }) => {
        let id = action.id;

        if (!id) {
          id = Object.keys(state.collection.collectionMap)[0];
        }

        const route = this.router.url.split('/').pop();

        // If the user is going directly to a URL, take them there.  Otherwise take them to the default page (states).
        if (route) {
          this.router.navigate([ 'collection/' + id + '/' + route ]);
        } else {
          this.router.navigate([ 'collection/' + id ]);
        }

        return [];
      })
    )
  );

  constructor(
    private actions: Actions,
    private collectionService: CollectionService,
    private dialog: MatDialog,
    private router: Router,
    private store: Store<AppState>
  ) {}
}
