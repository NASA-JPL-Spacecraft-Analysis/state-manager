import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { concat } from 'rxjs';

import { StateManagementService } from '../services/state-management.service';
import { ofRoute } from '../functions/router';
import { StateVariableActions } from '../actions';

@Injectable()
export class NavEffects {
  constructor(
    private actions: Actions,
    private stateManagementService: StateManagementService
  ) {}

  public navStates = createEffect(() =>
    this.actions.pipe(
      ofRoute('states'),
      switchMap(_ =>
        concat(
          this.stateManagementService.getStateVariables().pipe(
            map(stateVariables => StateVariableActions.setStateVariables({ stateVariables })),
            catchError(
              (error: Error) => [
                StateVariableActions.fetchStateVariablesFailure({ error })
              ]
            )
          ),
          this.stateManagementService.getStateEnumerations().pipe(
            map(stateEnumerations => StateVariableActions.setStateEnumerations({ stateEnumerations })),
            catchError(
              (error: Error) => [
                StateVariableActions.fetchStateEnumerationsFailure({ error })
              ]
            )
          )
        )
      )
    )
  );
}
