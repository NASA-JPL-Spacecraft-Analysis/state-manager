import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { InformationTypesService } from '../services';
import { ofRoute, mapToParam } from '../functions/router';
import { InformationTypesActions, CollectionActions } from '../actions';

@Injectable()
export class InformationTypesEffects {
  constructor(
    private actions: Actions,
    private informationTypesService: InformationTypesService
  ) {}

  public navInformationTypes = createEffect(() => {
    return this.actions.pipe(
      ofRoute('collection/:collectionId/information-types'),
      mapToParam<string>('collectionId'),
      switchMap(collectionId => {
        return this.getInformationTypes(collectionId);
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

  private getInformationTypes(id: string): Observable<Action> {
    return this.informationTypesService.getInformationTypes(
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
