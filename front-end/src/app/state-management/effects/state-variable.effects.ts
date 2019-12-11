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

  public createStateVariable = createEffect(() =>
    this.actions.pipe(
      ofType(StateVariableActions.createStateVariable),
      withLatestFrom(this.store),
      map(([action, state]) => ({ action, state })),
      switchMap(({ action, state }) => {
        return this.stateManagementService.createStateVariable(
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

  public editStateVariable = createEffect(() =>
    this.actions.pipe(
      ofType(StateVariableActions.editStateVariable),
      withLatestFrom(this.store),
      map(([action, state]) => ({ action, state })),
      switchMap(({ action, state }) => {
        return this.stateManagementService.editStateVariable(
          state.config.app.baseUrl,
          action.stateVariable
        ).pipe(
          switchMap(
            (stateVariables: StateVariable[]) => [
              StateVariableActions.editStateVariableSuccess({
                stateVariables
              })
            ]
          ),
          catchError(
            (error: Error) => [
              StateVariableActions.editStateVariableFailure({ error })
            ]
          )
        );
      })
    )
  );

  public fetchIdentifiers = createEffect(() =>
    this.actions.pipe(
      ofType(StateVariableActions.fetchIdentifiers),
      withLatestFrom(this.store),
      map(([_, state]) => state),
      switchMap(state => {
        return this.stateManagementService.getIdentifiers(
          state.config.app.baseUrl
        ).pipe(
          switchMap(
            (identifiers: string[]) => [
              StateVariableActions.setIdentifiers({
                identifiers
              })
            ]
          ),
          catchError(
            (error: Error) => [
              StateVariableActions.fetchIdentifiersFailure({ error })
            ]
          )
        );
      })
    )
  );
}
