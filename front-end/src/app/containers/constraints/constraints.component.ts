import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store';
import { SubSink } from 'subsink';

import { ConstraintSidenavModule, ConstraintTableModule } from 'src/app/components/constraints';
import { Constraint, IdentifierMap } from 'src/app/models';
import {
  getConstraintIdentifierMap,
  getConstraints,
  getConstraintTypes,
  getSelectedCollectionId,
  getSelectedConstraint,
  getShowSidenav
} from 'src/app/selectors';
import { ConstraintActions, LayoutActions, ToastActions } from 'src/app/actions';
import { UploadConstants } from 'src/app/constants';
import { NavigationService } from '../../services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-constraints',
  styleUrls: ['constraints.component.css'],
  templateUrl: 'constraints.component.html'
})
export class ConstraintsComponent implements OnDestroy {
  public constraint: Constraint;
  public constraintIdentifierMap: IdentifierMap;
  public constraints: Constraint[];
  public constraintTypes: string[];
  public showSidenav: boolean;
  public selectedCollectionId: string;

  private constraintId: string;
  private subscriptions: SubSink;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private location: Location,
    private navigationService: NavigationService,
    private router: Router,
    private store: Store<AppState>
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
        this.constraint = selectedConstraint;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getConstraintTypes)).subscribe(constraintTypes => {
        this.constraintTypes = constraintTypes;
        this.changeDetectorRef.markForCheck();
      })
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
      csvFormat: [UploadConstants.constraintCsvUploadFormat],
      dialogType: 'Constraint',
      jsonFormat: UploadConstants.constraintJsonUploadFormat,
      types: this.constraintTypes
    }));
  }

  public onModifyConstraint(constraint?: Constraint): void {
    this.store.dispatch(ConstraintActions.setSelectedConstraint({
      id: constraint?.id
    }));

    const newConstraintId = constraint?.id ?? '';

    this.navigationService.addItemIDToURL(this.constraintId, newConstraintId, this.location, this.router.url);
    this.constraintId = newConstraintId;

    this.store.dispatch(LayoutActions.toggleSidenav({
      showSidenav: true
    }));
  }

  public onSidenavOutput(constraint: Constraint): void {
    if (!constraint) {
      // If the user is closing the sidenav intentionally, remove the ID from the URL.
      this.navigationService.removeIDFromURL(this.location, this.router.url);
      this.constraintId = '';

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
export class ConstraintsModule { }
