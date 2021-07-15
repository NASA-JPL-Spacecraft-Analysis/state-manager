import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { MaterialModule } from 'src/app/material';
import { CommandHistory } from 'src/app/models';
import { getCommandHistory } from 'src/app/selectors';
import { CommandTableModule } from 'src/app/components/commands';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'command-history',
  styleUrls: [ 'command-history.component.css' ],
  templateUrl: 'command-history.component.html'
})
export class CommandHistoryComponent implements OnDestroy {
  public commandHistory: CommandHistory[];

  private subscriptions: SubSink;

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions = new SubSink();

    this.subscriptions.add(
      this.store.pipe(select(getCommandHistory)).subscribe(commandHistory => {
        this.commandHistory = commandHistory;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

@NgModule({
  declarations: [
    CommandHistoryComponent
  ],
  exports: [
    CommandHistoryComponent
  ],
  imports: [
    CommonModule,
    CommandTableModule,
    MaterialModule
  ]
})
export class CommandHistoryModule {}
