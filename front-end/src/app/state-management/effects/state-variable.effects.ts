import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, withLatestFrom, catchError } from 'rxjs/operators';

import { StateManagementService } from '../services/state-management.service';
import { StateManagementAppState } from '../state-management-app-store';
import { StateVariableActions } from '../actions';
import { StateVariable } from '../models';

@Injectable()
export class DataEffects {
  constructor(
    private actions: Actions,
    private stateManagementService: StateManagementService,
    private store: Store<StateManagementAppState>
  ) {}

  public modifyStateVariable = createEffect(() =>
    this.actions.pipe(
      ofType(StateVariableActions.modifyStateVariable),
      withLatestFrom(this.store),
      map(([action, state]) => ({ action, state })),
      switchMap(({ action, state }) => {
        return this.stateManagementService.createNewStateVariable(
          state.config.app.baseUrl,
          action.stateVariable
        ).pipe(
          switchMap(
            (stateVariables: StateVariable[]) => [
              StateVariableActions.createStateVariableSuccess({
                stateVariables
              })
            ]
          ),
          catchError(
            (error: Error) => [
              StateVariableActions.createStateVariableFailure({ error })
            ]
          )
        );
      })
    )
  );
}
