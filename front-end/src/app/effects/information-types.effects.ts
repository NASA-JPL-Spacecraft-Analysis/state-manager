import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { InformationTypeService } from '../services';
import { mapToParam, ofRoute } from '../functions/router';
import { InformationTypeActions } from '../actions';

@Injectable()
export class InformationTypeEffects {
  public navInformationTypes = createEffect(() =>
    this.actions.pipe(
      ofRoute('collection/:collectionId/information-types'),
      mapToParam<string>('collectionId'),
      switchMap(collectionId =>
        this.getInformationTypes(collectionId)
      )
    )
  );

  constructor(
    private actions: Actions,
    private informationTypeService: InformationTypeService
  ) {}

  public getInformationTypes(id: string): Observable<Action> {
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
