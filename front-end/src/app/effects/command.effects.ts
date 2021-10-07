import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, merge, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { CommandActions, LayoutActions, ToastActions } from '../actions';
import { CommandService } from '../services';
import { mapToParam, ofRoute } from '../functions/router';
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
      mapToParam<string>('collectionId'),
      switchMap(collectionId => {
        const url = this.router.routerState.snapshot.url.split('/').pop();
        let history = true;

        if (url === 'command-argument-history') {
          return merge(
            of(LayoutActions.toggleSidenav({
              showSidenav: false
            })),
            this.getCommandArgumentHistory(collectionId)
          );
        } else if (url === 'commands') {
          history = false;
        }

        return merge(
          of(LayoutActions.toggleSidenav({
            showSidenav: false
          })),
          this.getCommands(collectionId, history)
        );
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
    private router: Router
  ) {}

  public getCommandArgumentHistory(collectionId: string): Observable<Action> {
    return this.commandService.getCommandArgumentHistory(
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
    );
  }

  public getCommands(collectionId: string, history: boolean): Observable<Action> {
    if (!history) {
      return merge(
        this.commandService.getCommandArguments(
          collectionId
        ).pipe(
          map(commandArguments => CommandActions.setCommandArguments({
            commandArguments
          })),
          catchError(
            (error: Error) => [
              CommandActions.fetchCommandArgumentsFailure({
                error
              })
            ]
          )
        ),
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
    } else {
      return this.commandService.getCommandHistory(
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
      );
    }
  }
}
