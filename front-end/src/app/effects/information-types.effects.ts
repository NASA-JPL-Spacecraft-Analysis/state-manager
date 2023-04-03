import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect } from '@ngrx/effects';
import { concat, EMPTY, merge, Observable, of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import { InformationTypeService } from '../services';
import { mapToParam, ofRoute } from '../functions/router';
import { InformationTypeActions, LayoutActions } from '../actions';
import { AppState } from '../app-store';
import { InformationTypeMap } from '../models';

@Injectable()
export class InformationTypeEffects {
  public navInformationTypes = createEffect(() =>
    this.actions.pipe(
      ofRoute('collection/:collectionId/information-types'),
      mapToParam<string>('collectionId'),
      withLatestFrom(this.store),
      map(([collectionId, store]) => ({ collectionId, store })),
      switchMap(({ collectionId, store }) =>
        merge(
          of(
            LayoutActions.toggleSidenav({
              showSidenav: false
            })
          ),
          of(
            LayoutActions.isLoading({
              isLoading: true
            })
          ),
          concat(
            this.loadInformationTypes(collectionId, store.informationTypes.informationTypeMap),
            of(LayoutActions.isLoading({ isLoading: false }))
          )
        )
      )
    )
  );

  constructor(
    private actions: Actions,
    private informationTypeService: InformationTypeService,
    private store: Store<AppState>
  ) {}

  public loadInformationTypes(
    collectionId: string,
    informationTypesMap: InformationTypeMap
  ): Observable<Action> {
    if (!informationTypesMap) {
      return this.informationTypeService.getInformationTypes(collectionId).pipe(
        map((informationTypes) =>
          InformationTypeActions.setInformationTypes({
            informationTypes
          })
        ),
        catchError((error: Error) => [
          InformationTypeActions.fetchInformationTypesFailure({
            error
          })
        ])
      );
    }

    return EMPTY;
  }
}
