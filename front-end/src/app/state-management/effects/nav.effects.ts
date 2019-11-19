import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { withLatestFrom, switchMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { StateManagementAppState } from '../state-management-app-store';
import { StateManagementService } from '../services/state-management.service';
import { ofRoute } from '../functions/router';

@Injectable()
export class NavEffects {
  constructor(
    private actions: Actions,
    private stateManagementService: StateManagementService,
    private store: Store<StateManagementAppState>
  ) {}

  public navRoot = createEffect(() =>
    this.actions.pipe(
      ofRoute('states'),
      withLatestFrom(this.store),
      map(([_, state]) => state),
      switchMap(state =>
        forkJoin([
          this.stateManagementService.getStateVariables()
        ]),
      ),
      switchMap((actions: Action[]) => [
        ...actions,
      ]),
    )
  );
}
