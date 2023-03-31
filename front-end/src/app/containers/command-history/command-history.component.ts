import { CommonModule } from '@angular/common';
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
import { getCommandHistory, getIsLoading } from 'src/app/selectors';
import { CommandTableModule } from 'src/app/components/commands';
import { LoadingModule } from '../../components/loading/loading.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-command-history',
  styleUrls: ['command-history.component.css'],
  templateUrl: 'command-history.component.html'
})
export class CommandHistoryComponent implements OnDestroy {
  public commandHistory: Command[];
  public isLoading: boolean;

  private subscriptions: SubSink;

  constructor(private store: Store<AppState>, private changeDetectorRef: ChangeDetectorRef) {
    this.subscriptions = new SubSink();

    this.subscriptions.add(
      this.store.pipe(select(getCommandHistory)).subscribe((commandHistory) => {
        this.commandHistory = commandHistory;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getIsLoading)).subscribe((isLoading) => {
        this.isLoading = isLoading;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

@NgModule({
  declarations: [CommandHistoryComponent],
  exports: [CommandHistoryComponent],
  imports: [CommonModule, CommandTableModule, LoadingModule]
})
export class CommandHistoryModule {}
