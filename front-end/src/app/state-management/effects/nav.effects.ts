import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { withLatestFrom, switchMap, map, catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { StateManagementAppState } from '../state-management-app-store';
import { StateManagementService } from '../services/state-management.service';
import { ofRoute } from '../functions/router';
import { StateVariable } from '../models';
import { StateVariableActions } from '../actions';

@Injectable()
export class NavEffects {
  constructor(
    private actions: Actions,
    private stateManagementService: StateManagementService,
    private store: Store<StateManagementAppState>
  ) {}

  public navStates = createEffect(() =>
    this.actions.pipe(
      ofRoute('states'),
      withLatestFrom(this.store),
      map(([_, state]) => state),
      switchMap(state => {
        return this.stateManagementService.getStateVariables(
          state.config.app.baseUrl
        ).pipe(
          switchMap(
            (stateVariables: StateVariable[]) => [
              StateVariableActions.setStateVariables({
                stateVariables
              })
            ]
          ),
          catchError(
            (error: Error) => [
              StateVariableActions.fetchStateVariablesFailure({
                error
              })
            ]
          )
        );
      })
    )
  );
}
