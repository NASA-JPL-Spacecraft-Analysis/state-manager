import { Component, ChangeDetectionStrategy, NgModule, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { RelationshipMap, Relationship } from 'src/app/models/relationship';
import {
  getRelationships,
  getSelectedRelationship,
  getStates,
  getInformationTypes,
  getEventMap,
  getShowSidenav
} from 'src/app/selectors';
import { RelationshipsTableModule } from 'src/app/components/relationships-table/relationships-table.component';
import { StateActions, LayoutActions, ToastActions, FileUploadActions } from 'src/app/actions';
import { RelationshipsSidenavModule } from 'src/app/components';
import { MaterialModule } from 'src/app/material';
import { StateMap, InformationTypesMap, EventMap } from 'src/app/models';
import { StateManagementConstants } from 'src/app/constants/state-management.constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'relationships',
  styleUrls: [ 'relationships.component.css' ],
  templateUrl: 'relationships.component.html'
})
export class RelationshipsComponent implements OnDestroy {
  public eventMap: EventMap;
  public informationTypesMap: InformationTypesMap;
  public relationshipMap: RelationshipMap;
  public relationship: Relationship;
  public showSidenav: boolean;
  public stateMap: StateMap;

  private subscriptions = new SubSink();

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions.add(
      this.store.pipe(select(getEventMap)).subscribe(eventMap => {
        this.eventMap = eventMap;
        this.changeDetectorRef.markForCheck();
      }),
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
      this.store.pipe(select(getStates)).subscribe(stateMap => {
        this.stateMap = stateMap;
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

    if (file && (fileType === 'csv' || fileType === 'json')) {
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
   * Only dispatch our actions if we have states, otherwise tell the user they need state
   * before they can create relationships.
   * @param relationship The relationship that is being modified.
   */
  public onModifyRelationship(relationship?: Relationship): void {
    // TODO: Check for events and information types here as well.
    if (this.stateMap) {
      this.store.dispatch(StateActions.setSelectedRelationship({
        relationship
      }));

      this.store.dispatch(LayoutActions.toggleSidenav({
        showSidenav: true
      }));
    } else {
      this.store.dispatch(ToastActions.showToast({
        message: 'You must create states, events, or information types before creating relationships',
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
        this.store.dispatch(StateActions.createRelationship({
          relationship
        }));
      } else {
        this.store.dispatch(StateActions.editRelationship({
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
