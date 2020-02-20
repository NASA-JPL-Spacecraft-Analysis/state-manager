import { Component, ChangeDetectionStrategy, NgModule, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { RelationshipMap, Relationship } from 'src/app/models/relationship';
import { getRelationships, getSelectedRelationship, getStateVariables } from 'src/app/selectors';
import { RelationshipsTableModule } from 'src/app/components/relationships-table/relationships-table.component';
import { getShowSidenav } from 'src/app/selectors/layout.selector';
import { StateVariableActions, LayoutActions, ToastActions } from 'src/app/actions';
import { RelationshipsSidenavModule } from 'src/app/components';
import { MaterialModule } from 'src/app/material';
import { StateVariableMap } from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'relationships',
  styleUrls: [ 'relationships.component.css' ],
  templateUrl: 'relationships.component.html'
})
export class RelationshipsComponent implements OnDestroy {
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

  public onFormErrorOutput(error: string): void {
    this.store.dispatch(ToastActions.showToast({
      message: error,
      toastType: 'error'
    }));
  }

  public onModifyRelationship(relationship?: Relationship): void {
    this.store.dispatch(StateVariableActions.setSelectedRelationship({
      relationship
    }));

    this.store.dispatch(LayoutActions.toggleSidenav({
      showSidenav: true
    }));
  }

  public onRelationshipOutput(relationship: Relationship): void {
    if (relationship !== undefined) {
      if (relationship.id === undefined) {
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
    RelationshipsTableModule
  ]
})
export class RelationshipsModule {}
