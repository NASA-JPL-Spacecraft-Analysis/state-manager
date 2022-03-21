import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { MaterialModule } from 'src/app/material';
import { Command, CommandArgument, CommandMap, IdentifierMap } from 'src/app/models';
import {
  getCommandArguments,
  getCommandIdentifierMap,
  getCommandMap,
  getCommandTypes,
  getSelectedCollectionId,
  getSelectedCommand,
  getShowSidenav
} from 'src/app/selectors';
import { CommandActions, LayoutActions, ToastActions } from 'src/app/actions';
import { CommandSidenavModule, CommandTableModule } from 'src/app/components';
import { UploadConstants } from 'src/app/constants';
import { NavigationService } from '../../services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-commands',
  styleUrls: [ 'commands.component.css' ],
  templateUrl: 'commands.component.html'
})
export class CommandsComponent implements OnDestroy {
  public command: Command;
  public commandArguments: CommandArgument[];
  public commandIdentifierMap: IdentifierMap;
  public commandMap: CommandMap;
  public commandTypes: string[];
  public showSidenav: boolean;
  public selectedCollectionId: string;

  private commandId: string;
  private subscriptions: SubSink;

  constructor(
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private location: Location,
    private navigationService: NavigationService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.subscriptions = new SubSink();

    this.subscriptions.add(
      this.store.pipe(select(getCommandArguments)).subscribe(commandArguments => {
        this.commandArguments = commandArguments;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getCommandIdentifierMap)).subscribe(commandIdentifierMap => {
        this.commandIdentifierMap = commandIdentifierMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getCommandMap)).subscribe(commandMap => {
        this.commandMap = commandMap;
        this.changeDetectorRef.markForCheck();

        this.commandId = this.activatedRoute.snapshot.paramMap.get('id');

        if (this.commandId && this.commandMap) {
          this.onModifyCommand(this.commandMap[this.commandId]);
        }
      }),
      this.store.pipe(select(getShowSidenav)).subscribe(showSidenav => {
        this.showSidenav = showSidenav;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedCollectionId)).subscribe(selectedCollectionId => {
        this.selectedCollectionId = selectedCollectionId;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getCommandTypes)).subscribe(commandTypes => {
        this.commandTypes = commandTypes;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedCommand)).subscribe(selectedCommand => {
        this.command = selectedCommand;
        this.changeDetectorRef.markForCheck();
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onCommandArgumentFileUpload(): void {
    this.store.dispatch(LayoutActions.openFileUploadDialog({
      collectionId: this.selectedCollectionId,
      csvFormat: [ UploadConstants.commandArgumentCsvUploadFormat ],
      dialogType: 'Command Argument',
      jsonFormat: UploadConstants.commandArgumentJsonUploadFormat
    }));
  }

  public onCommandFileUpload(): void {
    this.store.dispatch(LayoutActions.openFileUploadDialog({
      collectionId: this.selectedCollectionId,
      csvFormat: [ UploadConstants.commandCsvUploadFormat ],
      dialogType: 'Command',
      jsonFormat: UploadConstants.commandJsonUploadFormat,
      types: this.commandTypes
    }));
  }

  public onDuplicateIdentifier(duplicateIdentifier: boolean): void {
    if (duplicateIdentifier) {
      this.store.dispatch(
        ToastActions.showToast({
          message: 'Please provide a unique identifier',
          toastType: 'error'
        })
      );
    }
  }

  public onModifyCommand(command?: Command): void {
    this.store.dispatch(CommandActions.setSelectedCommand({
      id: command?.id
    }));

    const newCommandId = command?.id ?? '';

    this.navigationService.addItemIDToURL(this.commandId, newCommandId, this.location, this.router.url);
    this.commandId = newCommandId;

    this.store.dispatch(LayoutActions.toggleSidenav({
      showSidenav: true
    }));
  }

  public onSidenavError(error: string): void {
    this.store.dispatch(ToastActions.showToast({
      message: error,
      toastType: 'error'
    }));
  }

  public onSidenavOutput(result: { command: Command; deletedArgumentIds: string[] }): void {
    if (!result) {
      // If the user is closing the sidenav intentionally, remove the ID from the URL.
      this.navigationService.removeIDFromURL(this.location, this.router.url);
      this.commandId = '';

      this.store.dispatch(LayoutActions.toggleSidenav({
        showSidenav: false
      }));
    } else {
      if (!result.command.id) {
        this.store.dispatch(CommandActions.createCommand({
          command: result.command
        }));
      } else {
        this.store.dispatch(CommandActions.updateCommand({
          command: result.command
        }));
      }

      if (result.deletedArgumentIds.length > 0 && result.command.id) {
        this.store.dispatch(CommandActions.deleteArguments({
          commandId: result.command.id,
          deletedArgumentIds: result.deletedArgumentIds
        }));
      }
    }
  }
}

@NgModule({
  declarations: [
    CommandsComponent
  ],
  exports: [
    CommandsComponent
  ],
  imports: [
    CommandSidenavModule,
    CommandTableModule,
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class CommandsModule {}
