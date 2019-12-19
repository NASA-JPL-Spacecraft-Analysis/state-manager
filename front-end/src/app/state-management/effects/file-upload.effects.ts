import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom, catchError } from 'rxjs/operators';

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
      switchMap(({ action, state }) => {
        return this.fileUploadService.parseFile(
          action.file
        ).pipe(
          switchMap(
            (parsedFile: string) => [
              StateVariableActions.parseStateVariablesFileSuccess({
                parsedFile
              })
            ]
          ),
          catchError(
            (error: Error) => [
              StateVariableActions.parseStateVariablesFileFailure({
                error
              })
            ]
          )
        );
      })
    )
  );
}
