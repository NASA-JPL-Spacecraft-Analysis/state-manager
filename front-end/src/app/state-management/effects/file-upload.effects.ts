import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { StateManagementAppState } from '../state-management-app-store';
import { FileUploadService } from '../services/file-upload.service';
import { StateVariableActions } from '../actions';

@Injectable()
export class FileUploadEffects {
  constructor(
    private actions: Actions,
    private store: Store<StateManagementAppState>,
    private fileUploadService: FileUploadService
  ) {}

  public parseStateVariables = createEffect(() =>
    this.actions.pipe(
      ofType(StateVariableActions.parseStateVariablesFile),
      withLatestFrom(this.store),
      map(([action, state]) => ({ action, state })),
      switchMap(({ action, state }) =>
        forkJoin([
          this.fileUploadService.parseFile(
            action.file
          )
        ]),
      ),
      switchMap((actions: Action[]) => [
        ...actions
      ])
    )
  );
}
