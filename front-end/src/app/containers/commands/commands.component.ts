import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { MaterialModule } from 'src/app/material';
import { Command, IdentifierMap } from 'src/app/models';
import { getCommandIdentifierMap, getCommands, getSelectedCollectionId, getSelectedCommand, getShowSidenav } from 'src/app/selectors';
import { CommandActions, LayoutActions, ToastActions } from 'src/app/actions';
import { CommandSidenavModule, CommandTableModule } from 'src/app/components';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-commands',
  styleUrls: [ 'commands.component.css' ],
  templateUrl: 'commands.component.html'
})
export class CommandsComponent implements OnDestroy {
  public command: Command;
  public commandIdentifierMap: IdentifierMap;
  public commands: Command[];
  public showSidenav: boolean;
  public selectedCollectionId: string;

  private subscriptions: SubSink;

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions = new SubSink();

    this.subscriptions.add(
      this.store.pipe(select(getCommandIdentifierMap)).subscribe(commandIdentifierMap => {
        this.commandIdentifierMap = commandIdentifierMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getCommands)).subscribe(commands => {
        this.commands = commands;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getShowSidenav)).subscribe(showSidenav => {
        this.showSidenav = showSidenav;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedCollectionId)).subscribe(selectedCollectionId => {
        this.selectedCollectionId = selectedCollectionId;
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

  public onFileUpload(fileEvent: Event): void {
    const file = (fileEvent.target as HTMLInputElement).files[0];

    if (file) {
      // TODO: Implement file upload for commands.
    }
  }

  public onModifyCommand(command?: Command): void {
    this.store.dispatch(CommandActions.setSelectedCommand({
      id: command?.id
    }));

    this.store.dispatch(LayoutActions.toggleSidenav({
      showSidenav: true
    }));
  }

  public onSidenavOutput(command: Command): void {
    if (!command) {
      this.store.dispatch(LayoutActions.toggleSidenav({
        showSidenav: false
      }));
    } else {
      if (!command.id) {
        command.collectionId = this.selectedCollectionId;

        this.store.dispatch(CommandActions.createCommand({
          command
        }));
      } else {
        this.store.dispatch(CommandActions.updateCommand({
          command
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
    MaterialModule
  ]
})
export class CommandsModule {}
