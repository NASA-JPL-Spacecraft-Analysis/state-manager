import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store';
import { SubSink } from 'subsink';

import { ConstraintSidenavModule, ConstraintTableModule } from 'src/app/components/constraints';
import { Constraint, IdentifierMap } from 'src/app/models';
import { getConstraintIdentifierMap, getConstraints, getSelectedCollectionId, getSelectedConstraint, getShowSidenav } from 'src/app/selectors';
import { ConstraintActions, LayoutActions, ToastActions } from 'src/app/actions';
import { UploadConstants } from 'src/app/constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-constraints',
  styleUrls: [ 'constraints.component.css' ],
  templateUrl: 'constraints.component.html'
})
export class ConstraintsComponent implements OnDestroy {
  public constraint: Constraint;
  public constraintIdentifierMap: IdentifierMap;
  public constraints: Constraint[];
  public showSidenav: boolean;
  public selectedCollectionId: string;

  private subscriptions: SubSink;

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions = new SubSink();

    this.subscriptions.add(
      this.store.pipe(select(getConstraintIdentifierMap)).subscribe(constraintIdentifierMap => {
        this.constraintIdentifierMap = constraintIdentifierMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getConstraints)).subscribe(constraints => {
        this.constraints = constraints;
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
      this.store.pipe(select(getSelectedConstraint)).subscribe(selectedConstraint => {
        this.constraint = selectedConstraint
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

  public onFileUpload(): void {
    this.store.dispatch(LayoutActions.openFileUploadDialog({
      collectionId: this.selectedCollectionId,
      csvFormat: [ UploadConstants.constraintCsvUploadFormat ],
      dialogType: 'Constraint',
      jsonFormat: UploadConstants.constraintJsonUploadFormat
    }));
  }

  public onModifyConstraint(constraint?: Constraint): void {
    this.store.dispatch(ConstraintActions.setSelectedConstraint({
      id: constraint?.id
    }));

    this.store.dispatch(LayoutActions.toggleSidenav({
      showSidenav: true
    }));
  }

  public onSidenavOutput(constraint: Constraint): void {
    if (!constraint) {
      this.store.dispatch(LayoutActions.toggleSidenav({
        showSidenav: false
      }));
    } else {
      if (!constraint.id) {
        constraint.collectionId = this.selectedCollectionId;

        this.store.dispatch(ConstraintActions.createConstraint({
          constraint
        }));
      } else {
        this.store.dispatch(ConstraintActions.updateConstraint({
          constraint
        }));
      }
    }
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
    ConstraintSidenavModule,
    ConstraintTableModule,
    RouterModule
  ]
})
export class ConstraintsModule {}
