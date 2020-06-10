import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import { StateManagementService } from '../services/state-management.service';
import { ofRoute } from '../functions/router';
import { InformationTypesActions } from '../actions';

@Injectable()
export class InformationTypesEffects {
  constructor(
    private actions: Actions,
    private stateManagementService: StateManagementService
  ) {}

  public navInformationTypes = createEffect(() => {
    return this.actions.pipe(
      ofRoute('information-types'),
      switchMap(_ =>
        this.stateManagementService.getInformationTypes().pipe(
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
        )
      )
    );
  });
}
