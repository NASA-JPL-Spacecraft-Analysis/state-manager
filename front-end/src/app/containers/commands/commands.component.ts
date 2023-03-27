import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgModule,
  OnDestroy
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { Command } from 'src/app/models';
import {
  getCommands,
  getCommandTypes,
  getIsLoading,
  getIsSaving,
  getSelectedCollectionId,
  getSelectedCommand,
  getShowSidenav
} from 'src/app/selectors';
import { CommandActions, LayoutActions, ToastActions } from 'src/app/actions';
import { CommandSidenavModule, CommandTableModule } from 'src/app/components';
import { UploadConstants } from 'src/app/constants';
import { NavigationService } from '../../services';
import { LoadingModule } from '../../components/loading/loading.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-commands',
  styleUrls: ['commands.component.css'],
  templateUrl: 'commands.component.html'
})
export class CommandsComponent implements OnDestroy {
  public command: Command;
  public commands: Command[];
  public commandTypes: string[];
  public isLoading: boolean;
  public isSaving: boolean;
  public showSidenav: boolean;
  public selectedCollectionId: string;

  private commandId: string;
  private subscriptions: SubSink;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private location: Location,
    private navigationService: NavigationService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.subscriptions = new SubSink();

    this.subscriptions.add(
      this.store.pipe(select(getCommands)).subscribe((commands) => {
        this.commands = commands;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getIsLoading)).subscribe((isLoading) => {
        this.isLoading = isLoading;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getIsSaving)).subscribe((isSaving) => {
        this.isSaving = isSaving;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getShowSidenav)).subscribe((showSidenav) => {
        this.showSidenav = showSidenav;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedCollectionId)).subscribe((selectedCollectionId) => {
        this.selectedCollectionId = selectedCollectionId;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getCommandTypes)).subscribe((commandTypes) => {
        this.commandTypes = commandTypes;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedCommand)).subscribe((selectedCommand) => {
        this.command = selectedCommand;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onCommandArgumentFileUpload(): void {
    this.store.dispatch(
      LayoutActions.openFileUploadDialog({
        collectionId: this.selectedCollectionId,
        csvFormat: [UploadConstants.commandArgumentCsvUploadFormat],
        dialogType: 'Command Argument',
        jsonFormat: UploadConstants.commandArgumentJsonUploadFormat
      })
    );
  }

  public onCommandFileUpload(): void {
    this.store.dispatch(
      LayoutActions.openFileUploadDialog({
        collectionId: this.selectedCollectionId,
        csvFormat: [UploadConstants.commandCsvUploadFormat],
        dialogType: 'Command',
        jsonFormat: UploadConstants.commandJsonUploadFormat,
        types: this.commandTypes
      })
    );
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

  public onSelectCommand(command?: Command): void {
    this.store.dispatch(
      CommandActions.setSelectedCommand({
        id: command?.id
      })
    );

    const newCommandId = command?.id ?? '';

    this.navigationService.addItemIDToURL(
      this.commandId,
      newCommandId,
      this.location,
      this.router.url
    );
    this.commandId = newCommandId;

    this.store.dispatch(
      LayoutActions.toggleSidenav({
        showSidenav: true
      })
    );
  }

  public onSidenavError(error: string): void {
    this.store.dispatch(
      ToastActions.showToast({
        message: error,
        toastType: 'error'
      })
    );
  }

  public onSidenavOutput(): void {
    this.navigationService.removeIDFromURL(this.location, this.router.url);
    this.commandId = '';

    this.store.dispatch(
      LayoutActions.toggleSidenav({
        showSidenav: false
      })
    );
  }
}

@NgModule({
  declarations: [CommandsComponent],
  exports: [CommandsComponent],
  imports: [CommandSidenavModule, CommandTableModule, CommonModule, LoadingModule, RouterModule]
})
export class CommandsModule {}
