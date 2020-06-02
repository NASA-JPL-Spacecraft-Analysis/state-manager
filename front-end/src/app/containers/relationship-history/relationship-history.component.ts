import { NgModule, Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { SubSink } from 'subsink';

import { RelationshipsTableModule } from 'src/app/components/relationships-table/relationships-table.component';
import { AppState } from 'src/app/app-store';
import { StateVariableMap, RelationshipMap, InformationTypesMap, EventMap } from 'src/app/models';
import { getStateVariables, getRelationshipHistory, getInformationTypes, getEventMap } from 'src/app/selectors';
import { MaterialModule } from 'src/app/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'relationship-history',
  styleUrls: [ 'relationship-history.component.css' ],
  templateUrl: 'relationship-history.component.html'
})
export class RelationshipHistoryComponent implements OnDestroy {
  public eventMap: EventMap;
  public informationTypesMap: InformationTypesMap;
  public relationshipHistoryMap: RelationshipMap;
  public stateVariableMap: StateVariableMap;

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
      this.store.pipe(select(getRelationshipHistory)).subscribe(relationshipHistoryMap => {
        this.relationshipHistoryMap = relationshipHistoryMap;
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
}

@NgModule({
  declarations: [
    RelationshipHistoryComponent
  ],
  exports: [
    RelationshipHistoryComponent
  ],
  imports: [
    RelationshipsTableModule,
    CommonModule,
    MaterialModule
  ]
})
export class RelationshipHistoryModule {}
