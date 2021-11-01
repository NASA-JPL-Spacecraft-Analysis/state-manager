import { Component, NgModule, Input, OnChanges, ChangeDetectionStrategy, EventEmitter, Output, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

import {
  RelationshipMap,
  Relationship,
  StateMap,
  InformationTypeMap,
  EventMap,
  IdentifierTypeEnum,
  CommandMap,
  ConstraintMap,
  CommandArgumentMap,
  StringTMap,
  CommandArgument
} from 'src/app/models';
import { MaterialModule } from 'src/app/material';

import { TableComponent } from '../table/table.component';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-relationships-table',
  styleUrls: [ 'relationships-table.component.css' ],
  templateUrl: 'relationships-table.component.html'
})
export class RelationshipsTableComponent extends TableComponent<Relationship> implements OnInit, OnChanges {
  @Input() public commandArgumentMap: CommandArgumentMap;
  @Input() public commandMap: CommandMap;
  @Input() public constraintMap: ConstraintMap;
  @Input() public eventMap: EventMap;
  @Input() public history: boolean;
  @Input() public informationTypeMap: InformationTypeMap;
  @Input() public relationshipMap: RelationshipMap;
  @Input() public stateMap: StateMap;

  @Output() public relationshipSelected: EventEmitter<Relationship>;

  public relationshipsList: Relationship[];
  // Keep a map of command arguments so we don't have to loop over the list each time.
  public commandArguments: StringTMap<string>;

  constructor() {
    super();

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
    this.commandArguments = {};

    if (this.relationshipMap && this.displayedColumns) {
      for (const key of Object.keys(this.relationshipMap)) {
        this.relationshipsList.push(this.relationshipMap[key]);
      }

      this.dataSource = new MatTableDataSource(this.relationshipsList);

      super.ngOnChanges();
    }
  }

  public getType(id: string, type: string): string {
    switch (type) {
      case IdentifierTypeEnum.commandArgument:
        // If this is the first time we've seen a command argument, memoize them.
        if (Object.keys(this.commandArguments).length === 0) {
          this.mapCommandArguments();
        }

        if (this.commandArguments && this.commandArguments[id]) {
          return this.commandArguments[id];
        }

        break;
      case IdentifierTypeEnum.command:
        if (this.commandMap && this.commandMap[id]) {
          return this.commandMap[id].identifier;
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

        break;
      default:
        return '';
    }

    return '';
  }

  public onRowClick(relationship: Relationship): void {
    this.relationshipSelected.emit(relationship);
  }

  public filter(relationship: Relationship, filterValue: string): boolean {
    return relationship.description?.toLowerCase().includes(filterValue)
      || relationship.displayName?.toLowerCase().includes(filterValue)
      || relationship.subjectType?.toString().toLowerCase().includes(filterValue)
      || relationship.targetType?.toString().toLowerCase().includes(filterValue);
  }

  private mapCommandArguments() {
    for (const key of Object.keys(this.commandArgumentMap)) {
      for (const commandArgument of this.commandArgumentMap[key]) {
        this.commandArguments[commandArgument.id] = commandArgument.name;
      }
    }
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
