import { Component, NgModule, Input, OnChanges, ChangeDetectionStrategy, EventEmitter, Output, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  RelationshipMap,
  Relationship,
  StateMap,
  InformationTypeMap,
  EventMap,
  RelationshipTypeEnum,
  CommandMap,
  ConstraintMap,
  CommandArgumentMap,
  StringTMap,
  StateEnumerationMap
} from 'src/app/models';
import { MaterialModule } from 'src/app/material';

import { TableComponent } from '../table/table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-relationships-table',
  styleUrls: [ '../table/table.component.css' ],
  templateUrl: '../table/table.component.html'
})
export class RelationshipsTableComponent extends TableComponent<Relationship> implements OnInit, OnChanges {
  @Input() public commandArgumentMap: CommandArgumentMap;
  @Input() public commandMap: CommandMap;
  @Input() public constraintMap: ConstraintMap;
  @Input() public eventMap: EventMap;
  @Input() public history: boolean;
  @Input() public informationTypeMap: InformationTypeMap;
  @Input() public relationshipMap: RelationshipMap;
  @Input() public stateEnumerationMap: StateEnumerationMap;
  @Input() public stateMap: StateMap;

  @Output() public relationshipSelected: EventEmitter<Relationship>;

  public relationshipsList: Relationship[];
  // Keep a map of command arguments so we don't have to loop over the list each time.
  public commandArguments: StringTMap<string>;
  // Keep a map of state enumerations so we don't have to loop over the list each time.
  public stateEnumerations: StringTMap<string>;

  constructor() {
    super();

    this.relationshipSelected = new EventEmitter<Relationship>();
  }

  public ngOnInit(): void {
    this.columns.push(
      'displayName',
      'description',
      'subjectIdentifier',
      'subjectType',
      'targetIdentifier',
      'targetType'
    );

    if (this.history) {
      this.columns.push(
        'relationshipId',
        'updated'
      );

      this.historyTable = true;
    }
  }

  public ngOnChanges(): void {
    this.relationshipsList = [];
    this.commandArguments = {};
    this.stateEnumerations = {};

    if (this.relationshipMap) {
      for (const key of Object.keys(this.relationshipMap)) {
        this.relationshipsList.push(this.relationshipMap[key]);
      }

      let index = 0;

      for (const relationship of this.relationshipsList) {
        this.relationshipsList[index] = {
          ...relationship,
          subjectIdentifier: this.getType(relationship.subjectTypeId, relationship.subjectType),
          targetIdentifier: this.getType(relationship.targetTypeId, relationship.targetType)
        };

        index++;
      }

      this.rows = this.relationshipsList;
    }

    super.ngOnChanges();
  }

  public onRowClick(relationship: Relationship): void {
    this.relationshipSelected.emit(relationship);
  }

  private getType(id: string, type: string): string {
    switch (type) {
      case RelationshipTypeEnum['Command Argument']:
        // If this is the first time we've seen a command argument, memoize them.
        if (Object.keys(this.commandArguments).length === 0) {
          this.mapCommandArguments();
        }

        if (this.commandArguments && this.commandArguments[id]) {
          return this.commandArguments[id];
        }

        break;
      case RelationshipTypeEnum.Command:
        if (this.commandMap && this.commandMap[id]) {
          return this.commandMap[id].identifier;
        }

        break;
      case RelationshipTypeEnum.Constraint:
        if (this.constraintMap && this.constraintMap[id]) {
          return this.constraintMap[id].identifier;
        }

        break;
      case RelationshipTypeEnum.Event:
        if (this.eventMap && this.eventMap[id]) {
          return this.eventMap[id].identifier;
        }

        break;
      case RelationshipTypeEnum['Information Type']:
        if (this.informationTypeMap && this.informationTypeMap[id]) {
          return this.informationTypeMap[id].identifier;
        }

        break;
      case RelationshipTypeEnum['State Enumeration']:
        // If this is the first time we've seen a state enumeration, memoize them.
        if (Object.keys(this.stateEnumerations).length === 0) {
          this.mapStateEnumerations();
        }

        if (this.stateEnumerations && this.stateEnumerations[id]) {
          return this.stateEnumerations[id];
        }

        break;
      case RelationshipTypeEnum.State:
        if (this.stateMap && this.stateMap[id]) {
          return this.stateMap[id].identifier;
        }

        break;
      default:
        return '';
    }

    return '';
  }

  private mapCommandArguments() {
    for (const key of Object.keys(this.commandArgumentMap)) {
      for (const commandArgument of this.commandArgumentMap[key]) {
        this.commandArguments[commandArgument.id] = commandArgument.name;
      }
    }
  }

  private mapStateEnumerations() {
    for (const key of Object.keys(this.stateEnumerationMap)) {
      for (const stateEnumeration of this.stateEnumerationMap[key]) {
        this.stateEnumerations[stateEnumeration.id] = stateEnumeration.label;
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
