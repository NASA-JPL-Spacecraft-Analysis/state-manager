import { Component, ChangeDetectionStrategy, NgModule, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { RelationshipMap, Relationship } from 'src/app/models/relationship';
import { getRelationships, getSelectedRelationship, getIdentifiers } from 'src/app/selectors';
import { RelationshipsTableModule } from 'src/app/components/relationships-table/relationships-table.component';
import { getShowSidenav } from 'src/app/selectors/layout.selector';
import { StateVariableActions, LayoutActions } from 'src/app/actions';
import { RelationshipsSidenavModule } from 'src/app/components';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'relationships',
  styleUrls: [ 'relationships.component.css' ],
  templateUrl: 'relationships.component.html'
})
export class RelationshipsComponent implements OnDestroy {
  public identifiers: Set<string>;
  public relationships: RelationshipMap;
  public relationship: Relationship;
  public showSidenav: boolean;

  private subscriptions = new SubSink();

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions.add(
      this.store.pipe(select(getIdentifiers)).subscribe(identifiers => {
        this.identifiers = identifiers;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getRelationships)).subscribe(relationships => {
        this.relationships = relationships;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getSelectedRelationship)).subscribe(selectedRelationship => {
        this.relationship = selectedRelationship;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getShowSidenav)).subscribe(showSidenav => {
        this.showSidenav = showSidenav;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onNewRelationship(relationship?: Relationship): void {
    this.store.dispatch(StateVariableActions.setSelectedRelationship({
      relationship
    }));

    this.store.dispatch(LayoutActions.toggleSidenav({
      showSidenav: true
    }));
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
    MatButtonModule,
    MatToolbarModule,
    RelationshipsSidenavModule,
    RelationshipsTableModule
  ]
})
export class RelationshipsModule {}
