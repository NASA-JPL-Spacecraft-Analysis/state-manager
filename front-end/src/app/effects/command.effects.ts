import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect } from '@ngrx/effects';
import { Observable, merge, of, concat } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { CommandActions, LayoutActions } from '../actions';
import { CommandService } from '../services';
import { mapToParam, ofRoute } from '../functions/router';

@Injectable()
export class CommandEffects {
  public navCommands = createEffect(() =>
    this.actions.pipe(
      ofRoute([
        'collection/:collectionId/command-argument-history',
        'collection/:collectionId/commands',
        'collection/:collectionId/commands/',
        'collection/:collectionId/commands/:id',
        'collection/:collectionId/command-history'
      ]),
      mapToParam<string>('collectionId'),
      switchMap((collectionId) => {
        const url = this.router.routerState.snapshot.url.split('/').pop();
        let history = false;

        if (url === 'command-argument-history') {
          return merge(
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
            this.getCommandArgumentHistory(collectionId)
          );
        }

        if (url === 'command-history') {
          history = true;
        }

        return merge(
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
          this.getCommands(collectionId, history)
        );
      })
    )
  );

  constructor(
    private actions: Actions,
    private commandService: CommandService,
    private router: Router
  ) {}

  public getCommandArgumentHistory(collectionId: string): Observable<Action> {
    return concat(
      this.commandService.getCommandArgumentHistory(collectionId).pipe(
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
      ),
      of(LayoutActions.isLoading({ isLoading: false }))
    );
  }

  public getCommands(collectionId: string, history: boolean): Observable<Action> {
    if (!history) {
      return concat(
        this.commandService.getCommands(collectionId).pipe(
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
        ),
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
      );
    } else {
      return concat(
        this.commandService.getCommandHistory(collectionId).pipe(
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
        ),
        of(LayoutActions.isLoading({ isLoading: false }))
      );
    }
  }
}
