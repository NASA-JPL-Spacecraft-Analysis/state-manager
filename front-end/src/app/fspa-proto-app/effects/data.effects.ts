import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, withLatestFrom, catchError } from 'rxjs/operators';

import { DataService } from '../services/data.service';
import { FspaProtoAppState } from '../fspa-proto-app-store';
import { DataActions } from '../actions';
import { TestString } from '../models';

@Injectable()
export class DataEffects {
  constructor(
    private actions: Actions,
    private dataService: DataService,
    private store: Store<FspaProtoAppState>
  ) {}

  public createNewData = createEffect(() =>
    this.actions.pipe(
      ofType(DataActions.createNewData),
      withLatestFrom(this.store),
      map(([action, state]) => ({ action, state })),
      switchMap(({ action, state }) => {
        return this.dataService.createNewData(
          action.data
        ).pipe(
          switchMap(
            (data: Array<TestString>) => [
              DataActions.createTestStringSuccess({
                data
              })
            ]
          ),
          catchError(
            (error: Error) => [
              DataActions.createTestStringFailure({ error })
            ]
          )
        );
      })
    )
  );
}
