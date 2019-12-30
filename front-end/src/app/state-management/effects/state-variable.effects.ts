import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError } from 'rxjs/operators';

import { StateManagementService } from '../services/state-management.service';
import { StateVariableActions } from '../actions';

@Injectable()
export class StateVariableEffects {
  constructor(
    private actions: Actions,
    private stateManagementService: StateManagementService
  ) {}

  public createStateVariable = createEffect(() => {
    return this.actions.pipe(
      ofType(StateVariableActions.createStateVariable),
      switchMap(({ stateVariable }) =>
        this.stateManagementService.createStateVariable(stateVariable).pipe(
          switchMap((stateVariables) => {
            return [
              StateVariableActions.createStateVariableSuccess({ stateVariables })
            ];
          }),
          catchError(
            (error: Error) => [
              StateVariableActions.createStateVariableFailure({ error })
            ]
          )
        )
      )
    );
  });

  public editStateVariable = createEffect(() => {
    return this.actions.pipe(
      ofType(StateVariableActions.editStateVariable),
      switchMap(({ stateVariable }) =>
        this.stateManagementService.editStateVariable(stateVariable).pipe(
          switchMap((stateVariables) => {
            return [
              StateVariableActions.editStateVariableSuccess({ stateVariables })
            ];
          }),
          catchError(
            (error: Error) => [
              StateVariableActions.editStateVariableFailure({ error })
            ]
          )
        )
      )
    );
  });

  public fetchIdentifiers = createEffect(() => {
    return this.actions.pipe(
      ofType(StateVariableActions.fetchIdentifiers),
      switchMap(_ =>
        this.stateManagementService.getIdentifiers().pipe(
          switchMap((identifiers) => {
            return [
              StateVariableActions.setIdentifiers({ identifiers })
            ];
          }),
          catchError(
            (error: Error) => [
              StateVariableActions.fetchIdentifiersFailure({ error })
            ]
          )
        )
      )
    );
  });
}
