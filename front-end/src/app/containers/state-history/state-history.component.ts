import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgModule, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { SubSink } from 'subsink';

import { MaterialModule } from 'src/app/material';
import { StateMap } from 'src/app/models';
import { AppState } from 'src/app/app-store';
import { getStateHistory } from 'src/app/selectors';
import { StateTableModule } from 'src/app/components';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'state-history',
  styleUrls: [ 'state-history.component.css' ],
  templateUrl: 'state-history.component.html'
})
export class StateHistoryComponent implements OnDestroy {
  public stateHistoryMap: StateMap;

  private subscriptions = new SubSink();

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions.add(
      this.store.pipe(select(getStateHistory)).subscribe(stateHistoryMap => {
        this.stateHistoryMap = stateHistoryMap;
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
    StateHistoryComponent
  ],
  exports: [
    StateHistoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StateTableModule
  ]
})
export class StateHistoryModule {}
