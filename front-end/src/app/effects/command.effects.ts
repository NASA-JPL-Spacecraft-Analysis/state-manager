import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect } from '@ngrx/effects';
import { Observable, merge, of, concat, EMPTY } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';

import { CommandActions, LayoutActions } from '../actions';
import { CommandService } from '../services';
import { mapToParam, ofRoute } from '../functions/router';
import { Command } from '../models';
import { AppState } from '../app-store';

@Injectable()
export class CommandEffects {
  public navCommands = createEffect(() =>
    this.actions.pipe(
      ofRoute(['collection/:collectionId/commands/', 'collection/:collectionId/commands/:id']),
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
            this.loadCommands(collectionId, store.commands.commandMap),
            this.commandService.getCommandTypes().pipe(
              map((commandTypes) =>
                CommandActions.setCommandTypes({
                  commandTypes
                })
              ),
              catchError((error: Error) => [
                CommandActions.fetchCommandTypesFailure({
                  error
                })
              ])
            ),
            of(LayoutActions.isLoading({ isLoading: false }))
          )
        )
      )
    )
  );

  public navCommandHistory = createEffect(() =>
    this.actions.pipe(
      ofRoute(['collection/:collectionId/command-history']),
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
            store.commands.commandHistory
              ? this.commandService.getCommandHistory(collectionId).pipe(
                  map((commandHistory) =>
                    CommandActions.setCommandHistory({
                      commandHistory
                    })
                  ),
                  catchError((error: Error) => [
                    CommandActions.fetchCommandHistoryFailure({
                      error
                    })
                  ])
                )
              : EMPTY,
            of(LayoutActions.isLoading({ isLoading: false }))
          )
        )
      )
    )
  );

  public navCommandArgumentHistory = createEffect(() =>
    this.actions.pipe(
      ofRoute(['collection/:collectionId/command-argument-history']),
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
            store.commands.commandArgumentHistory
              ? this.commandService.getCommandArgumentHistory(collectionId).pipe(
                  map((commandArgumentHistory) =>
                    CommandActions.setCommandArgumentHistory({
                      commandArgumentHistory
                    })
                  ),
                  catchError((error: Error) => [
                    CommandActions.fetchCommandArgumentHistoryFailure({
                      error
                    })
                  ])
                )
              : EMPTY,
            of(LayoutActions.isLoading({ isLoading: false }))
          )
        )
      )
    )
  );

  constructor(
    private actions: Actions,
    private commandService: CommandService,
    private store: Store<AppState>
  ) {}

  public loadCommands(
    collectionId: string,
    commandMap: Record<string, Command>
  ): Observable<Action> {
    if (!commandMap) {
      return this.commandService.getCommands(collectionId).pipe(
        map((commands) =>
          CommandActions.setCommands({
            commands
          })
        ),
        catchError((error: Error) => [
          CommandActions.fetchCommandsFailure({
            error
          })
        ])
      );
    }

    return EMPTY;
  }
}
