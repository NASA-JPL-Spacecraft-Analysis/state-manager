import { NgModule, Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { SubSink } from 'subsink';

import { RelationshipsTableModule } from 'src/app/components/relationships-table/relationships-table.component';
import { AppState } from 'src/app/app-store';
import {
  StateMap,
  RelationshipMap,
  InformationTypeMap,
  EventMap,
  StateEnumerationMap,
  ConstraintMap,
  CommandArgumentMap,
  CommandMap
} from 'src/app/models';
import {
  getStates,
  getRelationshipHistory,
  getEventMap,
  getInformationTypeMap,
  getCommandMap,
  getCommandArgumentMap,
  getConstraintMap,
  getStateEnumerationMap
} from 'src/app/selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-relationship-history',
  styleUrls: [ 'relationship-history.component.css' ],
  templateUrl: 'relationship-history.component.html'
})
export class RelationshipHistoryComponent implements OnDestroy {
  public commandMap: CommandMap;
  public commandArgumentMap: CommandArgumentMap;
  public constraintMap: ConstraintMap;
  public eventMap: EventMap;
  public informationTypeMap: InformationTypeMap;
  public relationshipHistoryMap: RelationshipMap;
  public stateEnumerationMap: StateEnumerationMap;
  public stateMap: StateMap;

  private subscriptions = new SubSink();

  constructor(
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscriptions.add(
      this.store.pipe(select(getCommandMap)).subscribe(commandMap => {
        this.commandMap = commandMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getCommandArgumentMap)).subscribe(commandArgumentMap => {
        this.commandArgumentMap = commandArgumentMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getConstraintMap)).subscribe(constraintMap => {
        this.constraintMap = constraintMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getEventMap)).subscribe(eventMap => {
        this.eventMap = eventMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getInformationTypeMap)).subscribe(informationTypeMap => {
        this.informationTypeMap = informationTypeMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getRelationshipHistory)).subscribe(relationshipHistoryMap => {
        this.relationshipHistoryMap = relationshipHistoryMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getStates)).subscribe(stateMap => {
        this.stateMap = stateMap;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getStateEnumerationMap)).subscribe(stateEnumerationMap => {
        this.stateEnumerationMap = stateEnumerationMap;
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
    CommonModule,
    RelationshipsTableModule
  ]
})
export class RelationshipHistoryModule {}
