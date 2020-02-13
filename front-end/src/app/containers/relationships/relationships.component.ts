import { Component, ChangeDetectionStrategy, NgModule, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SubSink } from 'subsink';

import { AppState } from 'src/app/app-store';
import { RelationshipMap } from 'src/app/models/relationship';
import { getRelationships } from 'src/app/selectors';
import { RelationshipsTableModule } from 'src/app/components/relationships-table/relationships-table.component';
import { RelationshipsSidenavModule } from '../relationships-sidenav/relationships-sidenav.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'relationships',
  styleUrls: [ 'relationships.component.css' ],
  templateUrl: 'relationships.component.html'
})
export class RelationshipsComponent implements OnDestroy {
  public relationships: RelationshipMap;

  private subscriptions = new SubSink();

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions.add(
      this.store.pipe(select(getRelationships)).subscribe(relationships => {
        this.relationships = relationships;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onNewRelationship(): void {

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
