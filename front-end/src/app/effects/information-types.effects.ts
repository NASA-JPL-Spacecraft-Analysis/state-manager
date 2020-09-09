import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import { StateManagementService } from '../services/state-management.service';
import { ofRoute, mapToParam } from '../functions/router';
import { InformationTypesActions, CollectionActions } from '../actions';
import { AppState } from '../app-store';

@Injectable()
export class InformationTypesEffects {
  constructor(
    private actions: Actions,
    private stateManagementService: StateManagementService,
    private store: Store<AppState>
  ) {}

  public navInformationTypes = createEffect(() => {
    return this.actions.pipe(
      ofRoute('collection/:collectionId/information-types'),
      mapToParam<number>('collectionId'),
      switchMap(collectionId => {
        return this.getInformationTypes(Number(collectionId));
      })
    );
  });

  public getInformationTypesByCollectionId = createEffect(() => {
    return this.actions.pipe(
      ofType(CollectionActions.setSelectedCollection),
      switchMap(({ id }) => {
        if (id !== null) {
          return this.getInformationTypes(id);
        }

        return [];
      })
    );
  });

  private getInformationTypes(id: number): Observable<Action> {
    return this.stateManagementService.getInformationTypes(
      id
    ).pipe(
      map(informationTypes => InformationTypesActions.setInformationTypes({
        informationTypes
      })),
      catchError(
        (error: Error) => [
          InformationTypesActions.fetchInformationTypesFailure({
            error
          })
        ]
      )
    );
  }
}
