import { Component, NgModule, Input, OnChanges, ChangeDetectionStrategy, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import { RelationshipMap, Relationship, StateVariableMap, InformationTypesMap, InformationTypeEnum, EventMap } from 'src/app/models';
import { MaterialModule } from 'src/app/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'relationships-table',
  styleUrls: [ 'relationships-table.component.css' ],
  templateUrl: 'relationships-table.component.html'
})
export class RelationshipsTableComponent implements OnInit, OnChanges {
  // True if we're looking at the history page.
  @Input() public eventMap: EventMap;
  @Input() public history: boolean;
  @Input() public informationTypesMap: InformationTypesMap;
  @Input() public relationshipMap: RelationshipMap;
  @Input() public stateVariableMap: StateVariableMap;

  @Output() public relationshipSelected: EventEmitter<Relationship>;

  public dataSource: MatTableDataSource<Relationship>;
  public displayedColumns: string[] = [];
  public relationshipsList: Relationship[];

  constructor() {
    this.relationshipSelected = new EventEmitter<Relationship>();
  }

  public ngOnInit(): void {
    this.displayedColumns.push(
      'displayName',
      'description',
      'subjectType',
      'targetType',
      'subject',
      'target'
    );

    if (this.history) {
      this.displayedColumns.push(
        'relationshipId',
        'updated'
      );
    }
  }

  public ngOnChanges(): void {
    this.relationshipsList = [];

    if (this.relationshipMap && this.displayedColumns) {
      for (const key of Object.keys(this.relationshipMap)) {
        this.relationshipsList.push(this.relationshipMap[key]);
      }

      this.dataSource = new MatTableDataSource(this.relationshipsList);
    }
  }

  public getTypeIdentifier(id: number, type: string): string {
    if (type === InformationTypeEnum[InformationTypeEnum.State]) {
      return this.stateVariableMap[id].identifier;
    } else if (type === InformationTypeEnum[InformationTypeEnum.Event]) {
      return this.eventMap[id].identifier;
    }

    return this.informationTypesMap[type][id].identifier;
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
