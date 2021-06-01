import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import { InformationTypeService } from '../services';
import { ofRoute } from '../functions/router';
import { InformationTypeActions, CollectionActions } from '../actions';
import { AppState } from '../app-store';

@Injectable()
export class InformationTypeEffects {
  public navInformationTypes = createEffect(() =>
    this.actions.pipe(
      ofRoute('collection/:collectionId/information-types'),
      withLatestFrom(this.store),
      map(([_, state]) => state),
      switchMap(state => {
        if (state.collection.selectedCollectionId) {
          console.log('2');
          return this.getInformationTypes(state.collection.selectedCollectionId);
        }

        return [];
      })
    )
  );

  public getInformationTypesByCollectionId = createEffect(() =>
    this.actions.pipe(
      ofType(CollectionActions.setSelectedCollection),
      switchMap(({ id }) => {
        if (id !== null) {
          console.log('1');
          return this.getInformationTypes(id);
        }

        return [];
      })
    )
  );

  constructor(
    private actions: Actions,
    private informationTypeService: InformationTypeService,
    private store: Store<AppState>
  ) {}

  private getInformationTypes(id: string): Observable<Action> {
    return this.informationTypeService.getInformationTypes(
      id
    ).pipe(
      map(informationTypes => InformationTypeActions.setInformationTypes({
        informationTypes
      })),
      catchError(
        (error: Error) => [
          InformationTypeActions.fetchInformationTypesFailure({
            error
          })
        ]
      )
    );
  }
}
