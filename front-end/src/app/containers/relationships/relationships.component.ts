import { Component, ChangeDetectionStrategy, NgModule, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { RelationshipMap, Relationship } from 'src/app/models/relationship';
import { getRelationships, getSelectedRelationship, getStateVariables, getInformationTypes } from 'src/app/selectors';
import { RelationshipsTableModule } from 'src/app/components/relationships-table/relationships-table.component';
import { getShowSidenav } from 'src/app/selectors/layout.selector';
import { StateVariableActions, LayoutActions, ToastActions, FileUploadActions } from 'src/app/actions';
import { RelationshipsSidenavModule } from 'src/app/components';
import { MaterialModule } from 'src/app/material';
import { StateVariableMap, InformationTypesMap } from 'src/app/models';
import { StateManagementConstants } from 'src/app/constants/state-management.constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'relationships',
  styleUrls: [ 'relationships.component.css' ],
  templateUrl: 'relationships.component.html'
})
export class RelationshipsComponent implements OnDestroy {
  public informationTypesMap: InformationTypesMap;
  public relationshipMap: RelationshipMap;
  public relationship: Relationship;
  public showSidenav: boolean;
  public stateVariableMap: StateVariableMap;

  private subscriptions = new SubSink();

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions.add(
      this.store.pipe(select(getInformationTypes)).subscribe(informationTypesMap => {
        this.informationTypesMap = informationTypesMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getRelationships)).subscribe(relationshipMap => {
        this.relationshipMap = relationshipMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedRelationship)).subscribe(selectedRelationship => {
        this.relationship = selectedRelationship;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getShowSidenav)).subscribe(showSidenav => {
        this.showSidenav = showSidenav;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getStateVariables)).subscribe(stateVariableMap => {
        this.stateVariableMap = stateVariableMap;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onFileUpload(fileEvent: Event): void {
    const file = (fileEvent.target as HTMLInputElement).files[0];
    const fileType = file.name.split('.').pop().toLowerCase();

    // TODO: Support csv uploads later
    if (file && (fileType === 'json')) {
      this.store.dispatch(FileUploadActions.uploadRelationships({
        file,
        fileType
      }));
    } else {
      this.store.dispatch(ToastActions.showToast({
        message: StateManagementConstants.wrongFiletypeUploadMessage,
        toastType: 'error'
      }));
    }
  }

  public onFormErrorOutput(error: string): void {
    this.store.dispatch(ToastActions.showToast({
      message: error,
      toastType: 'error'
    }));
  }

  /**
   * Only dispatch our actions if we have state variables, otherwise tell the user they need state
   * variables before they can create relationships.
   * @param relationship The relationship that is being modified.
   */
  public onModifyRelationship(relationship?: Relationship): void {
    if (this.stateVariableMap) {
      this.store.dispatch(StateVariableActions.setSelectedRelationship({
        relationship
      }));

      this.store.dispatch(LayoutActions.toggleSidenav({
        showSidenav: true
      }));
    } else {
      this.store.dispatch(ToastActions.showToast({
        message: 'You must create state variables before creating relationships',
        toastType: 'error'
      }));
    }
  }

  public onRelationshipOutput(relationship: Relationship): void {
    if (relationship === undefined) {
      this.store.dispatch(LayoutActions.toggleSidenav({
        showSidenav: false
      }));
    } else {
      if (relationship.id === null) {
        this.store.dispatch(StateVariableActions.createRelationship({
          relationship
        }));
      } else {
        this.store.dispatch(StateVariableActions.editRelationship({
          relationship
        }));
      }
    }
  }
}

@NgModule({
  declarations: [
    RelationshipsComponent
  ],
  exports: [
    RelationshipsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RelationshipsSidenavModule,
    RelationshipsTableModule,
    RouterModule
  ]
})
export class RelationshipsModule {}
