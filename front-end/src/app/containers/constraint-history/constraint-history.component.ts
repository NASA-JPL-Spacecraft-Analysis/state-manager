import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { MaterialModule } from 'src/app/material';
import { Constraint } from 'src/app/models';
import { getConstraintHistory } from 'src/app/selectors';
import { ConstraintTableModule } from 'src/app/components/constraints';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'constraint-history',
  styleUrls: [ 'constraint-history.component.css' ],
  templateUrl: 'constraint-history.component.html'
})
export class ConstraintHistoryComponent implements OnDestroy {
  public constraintHistory: Constraint[];

  private subscriptions: SubSink;

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions = new SubSink();

    this.subscriptions.add(
      this.store.pipe(select(getConstraintHistory)).subscribe(constraintHistory => {
        this.constraintHistory = constraintHistory;
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
    ConstraintHistoryComponent
  ],
  exports: [
    ConstraintHistoryComponent
  ],
  imports: [
    CommonModule,
    ConstraintTableModule,
    MaterialModule
  ]
})
export class ConstraintHistoryModule {}
