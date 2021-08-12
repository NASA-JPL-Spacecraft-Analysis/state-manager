import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { MaterialModule } from 'src/app/material';
import { AppState } from 'src/app/app-store';
import { StateEnumerationHistory } from 'src/app/models';
import { getStateEnumerationHistory } from 'src/app/selectors';
import { StateEnumerationTableModule } from 'src/app/components';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'state-enumeration-history',
  styleUrls: [ 'state-enumeration-history.component.css' ],
  templateUrl: 'state-enumeration-history.component.html'
})
export class StateEnumerationHistoryComponent implements OnDestroy {
  public stateEnumerationHistory: StateEnumerationHistory[];

  private subscriptions: SubSink;

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions = new SubSink();

    this.subscriptions.add(
      this.store.pipe(select(getStateEnumerationHistory)).subscribe(stateEnumerationHistory => {
        this.stateEnumerationHistory = stateEnumerationHistory;
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
    StateEnumerationHistoryComponent
  ],
  exports: [
    StateEnumerationHistoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StateEnumerationTableModule
  ]
})
export class StateEnumerationHistoryModule {}
