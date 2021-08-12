import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, EMPTY, merge, of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';

import { CollectionActions, CommandActions, LayoutActions, ToastActions } from '../actions';
import { CommandService } from '../services';
import { AppState } from '../app-store';
import { ofRoute } from '../functions/router';
import { CommandResponse, DeleteArgumentResponse } from '../models';

@Injectable()
export class CommandEffects {
  public createCommand = createEffect(() =>
    this.actions.pipe(
      ofType(CommandActions.createCommand),
      switchMap(({ command }) =>
        this.commandService.createCommand(
          command
        ).pipe(
          switchMap((createCommand: CommandResponse) => [
            CommandActions.createCommandSuccess({
              command: createCommand.command
            }),
            ToastActions.showToast({
              message: createCommand.message,
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => [
            CommandActions.createCommandFailure({
              error
            }),
            ToastActions.showToast({
              message: error.message,
              toastType: 'error'
            })
          ])
        )
      )
    )
  );

  public deleteArguments = createEffect(() =>
    this.actions.pipe(
      ofType(CommandActions.deleteArguments),
      switchMap(({ commandId, deletedArgumentIds }) =>
        this.commandService.deleteArguments(
          commandId,
          deletedArgumentIds
        ).pipe(
          switchMap((deleteArguments: DeleteArgumentResponse) => [
            CommandActions.deleteArgumentsSuccess({
              deletedArgumentIds: deleteArguments.deletedArgumentIds
            }),
            ToastActions.showToast({
              message: deleteArguments.message,
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => [
            CommandActions.deleteArgumentsFailure({
              error
            }),
            ToastActions.showToast({
              message: error.message,
              toastType: 'error'
            })
          ])
        )
      )
    )
  );

  public navCommands = createEffect(() =>
    this.actions.pipe(
      ofRoute([
        'collection/:collectionId/command-argument-history',
        'collection/:collectionId/commands',
        'collection/:collectionId/command-history'
      ]),
      withLatestFrom(this.store),
      map(([_, state]) => state),
      switchMap(state => {
        if (state.collection.selectedCollectionId) {
          return this.getCommands(state.collection.selectedCollectionId);
        }

        return [];
      })
    )
  );

  public getCommandsByCollectionId = createEffect(() =>
    this.actions.pipe(
      ofType(CollectionActions.setSelectedCollection),
      switchMap(({ id }) => {
        if (id !== null) {
          return this.getCommands(id);
        }

        return [];
      })
    )
  );

  public updateCommand = createEffect(() =>
    this.actions.pipe(
      ofType(CommandActions.updateCommand),
      switchMap(({ command }) =>
        this.commandService.updateCommand(
          command
        ).pipe(
          switchMap((updateCommand: CommandResponse) => [
            CommandActions.updateCommandSuccess({
              command: updateCommand.command
            }),
            ToastActions.showToast({
              message: updateCommand.message,
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => [
            CommandActions.updateCommandFailure({
              error
            }),
            ToastActions.showToast({
              message: error.message,
              toastType: 'error'
            })
          ])
        )
      )
    )
  );

  constructor(
    private actions: Actions,
    private commandService: CommandService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  private getCommands(collectionId: string): Observable<Action> {
    const url = this.router.routerState.snapshot.url.split('/').pop();

    console.log(url);

    if (url === 'commands') {
      return merge(
        of(LayoutActions.toggleSidenav({
          showSidenav: false
        })),
        this.commandService.getCommands(
          collectionId
        ).pipe(
          map(commands => CommandActions.setCommands({
            commands
          })),
          catchError(
            (error: Error) => [
              CommandActions.fetchCommandsFailure({
                error
              })
            ]
          )
        )
      );
    } else if (url === 'command-argument-history') {
      return merge(
        of(LayoutActions.toggleSidenav({
          showSidenav: false
        })),
        this.commandService.getCommandArgumentHistory(
          collectionId
        ).pipe(
          map(commandArgumentHistory => CommandActions.setCommandArgumentHistory({
            commandArgumentHistory
          })),
          catchError(
            (error: Error) => [
              CommandActions.fetchCommandArgumentHistoryFailure({
                error
              })
            ]
          )
        )
      );
    } else if (url === 'command-history') {
      return merge(
        of(LayoutActions.toggleSidenav({
          showSidenav: false
        })),
        this.commandService.getCommandHistory(
          collectionId
        ).pipe(
          map(commandHistory => CommandActions.setCommandHistory({
            commandHistory
          })),
          catchError(
            (error: Error) => [
              CommandActions.fetchCommandHistoryFailure({
                error
              })
            ]
          )
        )
      );
    }

    return EMPTY;
  }
}
