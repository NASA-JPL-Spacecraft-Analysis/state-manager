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
import { MaterialModule } from 'src/app/material';
import { Constraint } from 'src/app/models';
import { getConstraintHistory, getIsLoading } from 'src/app/selectors';
import { ConstraintTableModule } from 'src/app/components/constraints';
import { LoadingModule } from '../../components/loading/loading.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-constraint-history',
  styleUrls: ['constraint-history.component.css'],
  templateUrl: 'constraint-history.component.html'
})
export class ConstraintHistoryComponent implements OnDestroy {
  public constraintHistory: Constraint[];
  public isLoading: boolean;

  private subscriptions: SubSink;

  constructor(private store: Store<AppState>, private changeDetectorRef: ChangeDetectorRef) {
    this.subscriptions = new SubSink();

    this.subscriptions.add(
      this.store.pipe(select(getConstraintHistory)).subscribe((constraintHistory) => {
        this.constraintHistory = constraintHistory;
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
  declarations: [ConstraintHistoryComponent],
  exports: [ConstraintHistoryComponent],
  imports: [CommonModule, ConstraintTableModule, MaterialModule, LoadingModule]
})
export class ConstraintHistoryModule {}
