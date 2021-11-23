import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, EMPTY, merge, of, forkJoin } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { GroupActions, LayoutActions, ToastActions } from '../actions';
import { mapToParam, ofRoute } from '../functions/router';
import { GroupService } from '../services';
import { GroupResponse, Response } from '../models';
import { ConfirmationDialogComponent } from '../components';
import { InformationTypeEffects } from './information-types.effects';
import { EventEffects } from './event.effects';
import { StateEffects } from './state.effects';
import { CommandEffects } from './command.effects';
import { ConstraintEffects } from './constraint.effects';

@Injectable()
export class GroupEffects {
  public createGroup = createEffect(() =>
    this.actions.pipe(
      ofType(GroupActions.createGroup),
      switchMap(({ collectionId, group }) =>
        this.groupService.createGroup(
          collectionId,
          group
        ).pipe(
          switchMap((createGroup: GroupResponse) => [
            GroupActions.createGroupSuccess({
              group: createGroup.group
            }),
            ToastActions.showToast({
              message: createGroup.message,
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => [
            GroupActions.createGroupFailure({
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

  public deleteGroup = createEffect(() =>
    this.actions.pipe(
      ofType(GroupActions.deleteGroup),
      switchMap(({ group }) => {
        const dialog = this.dialog.open(
          ConfirmationDialogComponent,
          {
            autoFocus: false,
            data: {
              confirmButtonText: 'Yes, delete ' + group.identifier,
              delete: true,
              message: 'Are you sure you want to delete "' + group.identifier + '"?',
              title: 'Delete ' + group.identifier + '?'
            }
          }
        );

        return forkJoin([
          of(group.id),
          dialog.afterClosed()
        ]);
      }),
      map(([ id, result ]) => ({
        id,
        result
      })),
      switchMap(({ id, result }) => {
        if (result) {
          return merge(
            this.groupService.deleteGroup(
              id
            ).pipe(
              switchMap((deleteGroup: Response) => [
                GroupActions.deleteGroupSuccess({
                  id
                }),
                LayoutActions.toggleSidenav({
                  showSidenav: false
                }),
                ToastActions.showToast({
                  message: deleteGroup.message,
                  toastType: 'success'
                })
              ]),
              catchError((error: Error) => [
                GroupActions.deleteGroupFailure({
                  error
                }),
                ToastActions.showToast({
                  message: error.message,
                  toastType: 'error'
                })
              ])
            )
          );
        }
        return EMPTY;
      })
    )
  );

  public navGroups = createEffect(() =>
    this.actions.pipe(
      ofRoute('collection/:collectionId/groups'),
      mapToParam<string>('collectionId'),
      switchMap(collectionId =>
        merge(
          this.constraintEffects.getConstraints(collectionId, false),
          this.commandEffects.getCommands(collectionId, false),
          this.eventEffects.getEvents(collectionId, false),
          this.getGroupsAndMappings(collectionId),
          this.informationTypeEffects.getInformationTypes(collectionId),
          this.stateEffects.getStates(collectionId, false)
        )
      )
    )
  );

  public updateGroup = createEffect(() =>
    this.actions.pipe(
      ofType(GroupActions.updateGroup),
      switchMap(({ collectionId, group }) =>
        this.groupService.updateGroup(
          group,
          collectionId
        ).pipe(
          switchMap((updateGroup: GroupResponse) => [
            GroupActions.updateGroupSuccess({
              group: updateGroup.group
            }),
            ToastActions.showToast({
              message: updateGroup.message,
              toastType: 'success'
            })
          ]),
          catchError((error: Error) => [
            GroupActions.updateGroupFailure({
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
    private commandEffects: CommandEffects,
    private constraintEffects: ConstraintEffects,
    private dialog: MatDialog,
    private eventEffects: EventEffects,
    private groupService: GroupService,
    private informationTypeEffects: InformationTypeEffects,
    private router: Router,
    private stateEffects: StateEffects
  ) {}

  private getGroupsAndMappings(collectionId: string): Observable<Action> {
    const url = this.router.routerState.snapshot.url.split('/').pop();

    if (url === 'groups') {
      return merge(
        of(LayoutActions.toggleSidenav({
          showSidenav: false
        })),
        this.groupService.getGroupsAndMappings(
          collectionId
        ).pipe(
          map(groups => GroupActions.setGroups({
            groups
          })),
          catchError(
            (error: Error) => [
              GroupActions.fetchGroupsFailure({
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
