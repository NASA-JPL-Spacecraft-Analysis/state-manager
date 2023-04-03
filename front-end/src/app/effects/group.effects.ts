import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, EMPTY, merge, of, forkJoin, concat } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';

import { GroupActions, InformationTypeActions, LayoutActions, ToastActions } from '../actions';
import { mapToParam, ofRoute } from '../functions/router';
import { GroupService, InformationTypeService } from '../services';
import { GroupResponse, Response } from '../models';
import { ConfirmationDialogComponent } from '../components';
import { AppState } from '../app-store';
import { StateEffects } from './state.effects';
import { EventEffects } from './event.effects';
import { ConstraintEffects } from './constraint.effects';
import { CommandEffects } from './command.effects';

@Injectable()
export class GroupEffects {
  public createGroup = createEffect(() =>
    this.actions.pipe(
      ofType(GroupActions.createGroup),
      switchMap(({ collectionId, group }) =>
        concat(
          this.groupService.createGroup(collectionId, group).pipe(
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
          ),
          of(LayoutActions.isSaving({ isSaving: false }))
        )
      )
    )
  );

  public deleteGroup = createEffect(() =>
    this.actions.pipe(
      ofType(GroupActions.deleteGroup),
      switchMap(({ group }) => {
        const dialog = this.dialog.open(ConfirmationDialogComponent, {
          autoFocus: false,
          data: {
            confirmButtonText: 'Yes, delete ' + group.identifier,
            delete: true,
            message: 'Are you sure you want to delete "' + group.identifier + '"?',
            title: 'Delete ' + group.identifier + '?'
          }
        });

        return forkJoin([of(group.id), dialog.afterClosed()]);
      }),
      map(([id, result]) => ({
        id,
        result
      })),
      switchMap(({ id, result }) => {
        if (result) {
          return merge(
            this.groupService.deleteGroup(id).pipe(
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
      withLatestFrom(this.store),
      map(([collectionId, store]) => ({ collectionId, store })),
      switchMap(({ collectionId, store }) => {
        const data = merge(
          of(
            LayoutActions.isLoading({
              isLoading: true
            })
          ),
          of(
            LayoutActions.toggleSidenav({
              showSidenav: false
            })
          ),
          this.constraintEffects.loadConstraints(collectionId, store.constraints.constraintMap),
          this.commandEffects.loadCommands(collectionId, store.commands.commandMap),
          this.eventEffects.loadEvents(collectionId, store.events.eventMap),
          this.getGroupsAndMappings(collectionId),
          this.informationTypeService.getInformationTypes(collectionId).pipe(
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
          ),
          this.stateEffects.loadStates(collectionId, store.states.stateMap)
        );

        return concat(data, of(LayoutActions.isLoading({ isLoading: false })));
      })
    )
  );

  public updateGroup = createEffect(() =>
    this.actions.pipe(
      ofType(GroupActions.updateGroup),
      switchMap(({ collectionId, group }) =>
        concat(
          this.groupService.updateGroup(group, collectionId).pipe(
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
          ),
          of(LayoutActions.isSaving({ isSaving: false }))
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
    private informationTypeService: InformationTypeService,
    private router: Router,
    private stateEffects: StateEffects,
    private store: Store<AppState>
  ) {}

  private getGroupsAndMappings(collectionId: string): Observable<Action> {
    const url = this.router.routerState.snapshot.url.split('/').pop();

    if (url === 'groups') {
      return concat(
        this.groupService.getGroupsAndMappings(collectionId).pipe(
          map((groups) =>
            GroupActions.setGroups({
              groups
            })
          ),
          catchError((error: Error) => [
            GroupActions.fetchGroupsFailure({
              error
            })
          ])
        )
      );
    }

    return EMPTY;
  }
}
