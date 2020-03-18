import { Component, NgModule, Input, OnChanges, ChangeDetectionStrategy, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import { RelationshipMap, Relationship, RelationshipHistoryMap, StateVariableMap } from 'src/app/models';
import { MaterialModule } from 'src/app/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'relationships-table',
  styleUrls: [ 'relationships-table.component.css' ],
  templateUrl: 'relationships-table.component.html'
})
export class RelationshipsTableComponent implements OnInit, OnChanges {
  @Input() public relationshipMap: RelationshipMap | RelationshipHistoryMap;
  @Input() public stateVariableMap: StateVariableMap;
  // True if we're looking at the history page.
  @Input() public history: boolean;

  @Output() public relationshipSelected: EventEmitter<Relationship>;

  public dataSource: MatTableDataSource<Relationship>;
  public displayedColumns: string[] = [
    'displayName',
    'description',
    'subjectState',
    'targetState',
    'type',
    'targetName'
  ];
  public relationshipsList: Relationship[];

  constructor() {
    this.relationshipSelected = new EventEmitter<Relationship>();
  }

  public ngOnInit(): void {
    if (this.history) {
      this.displayedColumns.push(
        'relationshipId',
        'updated'
      );
    }
  }

  public ngOnChanges(): void {
    this.relationshipsList = [];

    if (this.relationshipMap) {
      for (const key of Object.keys(this.relationshipMap)) {
        this.relationshipsList.push(this.relationshipMap[key]);
      }
    }

    this.dataSource = new MatTableDataSource(this.relationshipsList);
  }

  public getRelationshipStateName(id: number): string {
    if (id !== null) {
      return this.stateVariableMap[id].identifier;
    }

    return null;
  }

  public onRowClick(relationship: Relationship): void {
    this.relationshipSelected.emit(relationship);
  }
}

@NgModule({
  declarations: [
    RelationshipsTableComponent
  ],
  exports: [
   RelationshipsTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class RelationshipsTableModule {}
