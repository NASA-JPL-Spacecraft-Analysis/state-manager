import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { FileUploadActions, LayoutActions } from '../actions';
import { FileUploadDialogComponent } from '../components/file-upload-dialog/file-upload-dialog.component';

@Injectable()
export class LayoutEffects {
  constructor(
    private actions: Actions,
    private dialog: MatDialog
  ) {}

  public openFileUploadDialog = createEffect(() =>
    this.actions.pipe(
      ofType(LayoutActions.openFileUploadDialog),
      switchMap(({ collectionId, csvFormat, dialogType, jsonFormat }) => {
        const fileUploadDialog = this.dialog.open(
          FileUploadDialogComponent,
          {
            data: {
              csvFormat,
              dialogType,
              jsonFormat
            }
          }
        );
        
        return forkJoin([
          of(collectionId),
          of(dialogType),
          fileUploadDialog.afterClosed()
        ]);
      }),
      map(([ collectionId, dialogType, result ]) => ({
        collectionId,
        dialogType,
        result
      })),
      switchMap(({ collectionId, dialogType, result }) => {
        if (result) {
          switch (dialogType) {
            case 'Command': {
              return [
                FileUploadActions.uploadCommands({
                  collectionId,
                  file: result
                })
              ];
            }
            case 'Command Argument': {
              return [
                FileUploadActions.uploadCommandArguments({
                  collectionId,
                  file: result
                })
              ];
            }
            case 'Constraint': {
              return [
                FileUploadActions.uploadConstraints({
                  collectionId,
                  file: result
                })
              ];
            }
            case 'Event': {
              return [
                FileUploadActions.uploadEvents({
                  collectionId,
                  file: result
                })
              ];
            }
            case 'Group': {
              return [
                FileUploadActions.uploadGroups({
                  collectionId,
                  file: result
                })
              ];
            }
            case 'Information Type': {
              return [
                FileUploadActions.uploadInformationTypes({
                  collectionId,
                  file: result
                })
              ];
            }
            case 'Relationship': {
              return [
                FileUploadActions.uploadRelationships({
                  collectionId,
                  file: result
                })
              ];
            }
            case 'State': {
              return [
                FileUploadActions.uploadStates({
                  collectionId,
                  file: result
                })
              ];
            }
            case 'State Enumeration': {
              return [
                FileUploadActions.uploadStateEnumerations({
                  collectionId,
                  file: result
                })
              ];
            }
          }
        }

        return [];
      })
    )
  );
}
