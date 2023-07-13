import {
  Component,
  NgModule,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  RelationshipMap,
  Relationship,
  StateMap,
  InformationTypeMap,
  EventMap,
  RelationshipTypeEnum,
  CommandMap,
  ConstraintMap
} from 'src/app/models';
import { MaterialModule } from 'src/app/material';

import { TableComponent } from '../table/table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-relationships-table',
  styleUrls: ['../table/table.component.css'],
  templateUrl: '../table/table.component.html'
})
export class RelationshipsTableComponent
  extends TableComponent<Relationship>
  implements OnInit, OnChanges
{
  @Input() public commandMap: CommandMap;
  @Input() public constraintMap: ConstraintMap;
  @Input() public eventMap: EventMap;
  @Input() public history: boolean;
  @Input() public informationTypeMap: InformationTypeMap;
  @Input() public relationshipMap: RelationshipMap;
  @Input() public stateMap: StateMap;

  @Output() public relationshipSelected: EventEmitter<Relationship>;

  public relationshipsList: Relationship[];
  public commandArguments: Record<string, string>;
  public commandArgumentEnumerations: Record<string, string>;
  // Keep a map of state enumerations so we don't have to loop over the list each time.
  public stateEnumerations: Record<string, string>;

  constructor() {
    super();

    this.relationshipSelected = new EventEmitter<Relationship>();
  }

  public ngOnInit(): void {
    this.columns.push(
      'displayName',
      'subjectToTargetDescription',
      'subjectIdentifier',
      'subjectType',
      'targetToSubjectDescription',
      'targetIdentifier',
      'targetType'
    );

    if (this.history) {
      this.columns.push('relationshipId', 'updated');

      this.historyTable = true;
    }
  }

  public ngOnChanges(): void {
    this.relationshipsList = [];
    this.commandArguments = {};
    this.commandArgumentEnumerations = {};
    this.stateEnumerations = {};

    if (this.relationshipMap) {
      this.mapCommandArguments();
      this.mapStateEnumerations();

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
      case RelationshipTypeEnum.Command:
        if (this.commandMap && this.commandMap[id]) {
          return this.commandMap[id].identifier;
        }

        break;
      case RelationshipTypeEnum['Command Argument']:
        if (this.commandArguments && this.commandArguments[id]) {
          return this.commandArguments[id];
        }

        break;
      case RelationshipTypeEnum['Command Argument Enumeration']:
        if (this.commandArgumentEnumerations && this.commandArgumentEnumerations[id]) {
          return this.commandArgumentEnumerations[id];
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
    if (this.commandMap) {
      for (const command of Object.values(this.commandMap)) {
        if (command.arguments) {
          for (const commandArgument of command.arguments) {
            this.commandArguments[commandArgument.id] = commandArgument.name;

            for (const commandArgumentEnumeration of commandArgument.enumerations) {
              this.commandArgumentEnumerations[commandArgumentEnumeration.id] =
                commandArgumentEnumeration.label;
            }
          }
        }
      }
    }
  }

  private mapStateEnumerations() {
    if (this.stateMap) {
      for (const state of Object.values(this.stateMap)) {
        if (state.enumerations) {
          for (const stateEnumeration of state.enumerations) {
            this.stateEnumerations[stateEnumeration.id] = stateEnumeration.label;
          }
        }
      }
    }
  }
}

@NgModule({
  declarations: [RelationshipsTableComponent],
  exports: [RelationshipsTableComponent],
  imports: [CommonModule, MaterialModule]
})
export class RelationshipsTableModule {}
