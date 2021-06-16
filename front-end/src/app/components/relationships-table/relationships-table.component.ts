import { Component, NgModule, Input, OnChanges, ChangeDetectionStrategy, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import { RelationshipMap, Relationship, StateMap, InformationTypeMap, EventMap, IdentifierTypeEnum, CommandMap, ConstraintMap } from 'src/app/models';
import { MaterialModule } from 'src/app/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-relationships-table',
  styleUrls: [ 'relationships-table.component.css' ],
  templateUrl: 'relationships-table.component.html'
})
export class RelationshipsTableComponent implements OnInit, OnChanges {
  @Input() public commandMap: CommandMap;
  @Input() public constraintMap: ConstraintMap;
  @Input() public eventMap: EventMap;
  @Input() public history: boolean;
  @Input() public informationTypeMap: InformationTypeMap;
  @Input() public relationshipMap: RelationshipMap;
  @Input() public stateMap: StateMap;

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

      this.dataSource.filterPredicate = this.filter;
    }
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();

    this.dataSource.filter = filterValue;
  }

  public getType(id: string, type: string): string {
    switch (type) {
      case IdentifierTypeEnum.command:
        if (this.commandMap && this.commandMap[id]) {
          return this.commandMap[id].identifier
        }

        break;
      case IdentifierTypeEnum.constraint:
        if (this.constraintMap && this.constraintMap[id]) {
          return this.constraintMap[id].identifier;
        }

        break;
      case IdentifierTypeEnum.event:
        if (this.eventMap && this.eventMap[id]) {
          return this.eventMap[id].identifier;
        }

        break;
      case IdentifierTypeEnum.informationType:
        if (this.informationTypeMap && this.informationTypeMap[id]) {
          return this.informationTypeMap[id].identifier;
        }

        break;
      case IdentifierTypeEnum.state:
        if (this.stateMap && this.stateMap[id]) {
          return this.stateMap[id].identifier;
        }
      default:
        return '';
    }

    return '';
  }

  public onRowClick(relationship: Relationship): void {
    this.relationshipSelected.emit(relationship);
  }

  private filter(relationship: Relationship, filterValue: string): boolean {
    return relationship.description?.toLowerCase().includes(filterValue)
      || relationship.displayName?.toLowerCase().includes(filterValue)
      || relationship.subjectType?.toString().toLowerCase().includes(filterValue)
      || relationship.targetType?.toString().toLowerCase().includes(filterValue);
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
