import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store';
import { SubSink } from 'subsink';

import { ConstraintTableModule } from 'src/app/components/constraints';
import { MaterialModule } from 'src/app/material';
import { Constraint, ConstraintMap } from 'src/app/models';
import { getConstraintMap, getSelectedCollectionId, getShowSidenav } from 'src/app/selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-constraints',
  styleUrls: [ 'constraints.component.css' ],
  templateUrl: 'constraints.component.html'
})
export class ConstraintsComponent implements OnDestroy {
  public constraintMap: ConstraintMap;
  public showSidenav: boolean;
  public selectedCollectionId: string;

  private subscriptions: SubSink;

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions = new SubSink();

    this.subscriptions.add(
      this.store.pipe(select(getConstraintMap)).subscribe(constraintMap => {
        this.constraintMap = constraintMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getShowSidenav)).subscribe(showSidenav => {
        this.showSidenav = showSidenav;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedCollectionId)).subscribe(selectedCollectionId => {
        this.selectedCollectionId = selectedCollectionId;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public constraintSelected(constraint: Constraint): void {
    console.log(constraint);
  }
}

@NgModule({
  declarations: [
    ConstraintsComponent
  ],
  exports: [
    ConstraintsComponent
  ],
  imports: [
    CommonModule,
    ConstraintTableModule,
    MaterialModule
  ]
})
export class ConstraintsModule {}
