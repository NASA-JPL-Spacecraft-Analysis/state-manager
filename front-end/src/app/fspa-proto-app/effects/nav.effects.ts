import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { withLatestFrom, switchMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { FspaProtoAppState } from '../fspa-proto-app-store';
import { DataService } from '../services/data.service';
import { ofRoute } from 'src/libs/ngrx-router';

@Injectable()
export class NavEffects {
  constructor(
    private actions: Actions,
    private dataService: DataService,
    private store: Store<FspaProtoAppState>
  ) {}

  public navRoot = createEffect(() =>
    this.actions.pipe(
      ofRoute('test'),
      withLatestFrom(this.store),
      map(([_, state]) => state),
      switchMap(state =>
        forkJoin([
          this.dataService.getData()
        ]),
      ),
      switchMap((actions: Action[]) => [
        ...actions,
      ]),
    )
  );
}
