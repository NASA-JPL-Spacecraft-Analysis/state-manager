import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { getCommandArgumentHistory } from 'src/app/selectors';
import { CommandArgumentHistory } from 'src/app/models';
import { MaterialModule } from 'src/app/material';
import { CommandArgumentTableModule } from 'src/app/components/commands/command-argument-table/command-argument-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'command-argument-history',
  styleUrls: [ 'command-argument-history.component.css' ],
  templateUrl: 'command-argument-history.component.html'
})
export class CommandArgumentHistoryComponent implements OnDestroy {
  public commandArgumentHistory: CommandArgumentHistory[];

  private subscriptions: SubSink;

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions = new SubSink();

    this.subscriptions.add(
      this.store.pipe(select(getCommandArgumentHistory)).subscribe(commandArgumentHistory => {
        this.commandArgumentHistory = commandArgumentHistory;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

@NgModule({
  declarations: [
    CommandArgumentHistoryComponent
  ],
  exports: [
    CommandArgumentHistoryComponent
  ],
  imports: [
    CommandArgumentTableModule,
    CommonModule,
    MaterialModule
  ]
})
export class CommandArgumentHistoryModule {}
