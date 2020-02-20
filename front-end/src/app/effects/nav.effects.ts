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

  public navStatesAndRelationships = createEffect(() =>
    this.actions.pipe(
      ofRoute('state'),
      switchMap(_ =>
        concat(
          this.stateManagementService.getStateVariables().pipe(
            map(stateVariables => StateVariableActions.setStateVariables({
              stateVariables
            })),
            catchError(
              (error: Error) => [
                StateVariableActions.fetchStateVariablesFailure({
                  error
                })
              ]
            )
          ),
          this.stateManagementService.getStateEnumerations().pipe(
            map(stateEnumerations => StateVariableActions.setStateEnumerations({
              stateEnumerations
            })),
            catchError(
              (error: Error) => [
                StateVariableActions.fetchStateEnumerationsFailure({
                  error
                })
              ]
            )
          ),
          this.stateManagementService.getIdentifiers().pipe(
            map(identifiers => StateVariableActions.setIdentifiers({
              identifiers
            })),
            catchError(
              (error: Error) => [
                StateVariableActions.fetchIdentifiersFailure({
                  error
                })
              ]
            )
          )
        )
      )
    )
  );

  public navRelationships = createEffect(() =>
    this.actions.pipe(
      ofRoute('relationships'),
      switchMap(_ =>
        concat(
          this.stateManagementService.getRelationships().pipe(
            map(relationships => StateVariableActions.setRelationships({
              relationships
            })),
            catchError(
              (error: Error) => [
                StateVariableActions.fetchRelationshipsFailure({
                  error
                })
              ]
            )
          ),
          this.stateManagementService.getStateVariables().pipe(
            map(stateVariables => StateVariableActions.setStateVariables({
              stateVariables
            })),
            catchError(
              (error: Error) => [
                StateVariableActions.fetchStateVariablesFailure({
                  error
                })
              ]
            )
          )
        )
      )
    )
  );
}
