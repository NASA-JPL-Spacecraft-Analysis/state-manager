import { Component, ChangeDetectionStrategy, NgModule, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import {
  Command,
  CommandMap,
  CommandArgument,
  CommandArgumentMap,
  Constraint,
  ConstraintMap,
  Event,
  EventMap,
  InformationType,
  InformationTypeMap,
  Relationship,
  RelationshipTypeEnum,
  State,
  StateMap,
  StateEnumeration,
  StateEnumerationMap
} from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-relationship-type-picker',
  styleUrls: [ 'relationship-type-picker.component.css' ],
  templateUrl: 'relationship-type-picker.component.html'
})
export class RelationshipTypePickerComponent implements OnChanges {
  @Input() public commandArgumentMap: CommandArgumentMap;
  @Input() public commandMap: CommandMap;
  @Input() public constraintMap: ConstraintMap;
  @Input() public eventMap: EventMap;
  @Input() public informationTypeMap: InformationTypeMap;
  @Input() public isSubject: boolean;
  @Input() public parentFormGroup: FormGroup;
  @Input() public relationship: Relationship;
  @Input() public stateEnumerationMap: StateEnumerationMap;
  @Input() public stateMap: StateMap;
  @Input() public type: string;

  public formProperty: string;
  public isList: boolean;
  public title: string;
  public listMap: Record<string, CommandArgument[] | StateEnumeration[]>;
  public selectedTypeMap: Record<string, Command | Constraint | Event | InformationType | State>;
  public supplementalMap: Record<string, Command | State>;

  public ngOnChanges(): void {
    this.isList = false;

    if (this.isSubject) {
      this.title = 'Subject';
      this.formProperty = 'subjectTypeId';

      this.parentFormGroup.addControl(this.formProperty, new FormControl(this.relationship.subjectTypeId, [ Validators.required]));
    } else {
      this.title = 'Target';
      this.formProperty = 'targetTypeId';

      this.parentFormGroup.addControl(this.formProperty, new FormControl(this.relationship.targetTypeId, [ Validators.required]));
    }

    switch (this.type) {
      case RelationshipTypeEnum.Command:
        this.selectedTypeMap = this.commandMap;
        break;
      case RelationshipTypeEnum['Command Argument']:
        this.listMap = this.commandArgumentMap;
        this.supplementalMap = this.commandMap;
        this.isList = true;
        break;
      case RelationshipTypeEnum.Constraint:
        this.selectedTypeMap = this.constraintMap;
        break;
      case RelationshipTypeEnum.Event:
        this.selectedTypeMap = this.eventMap;
        break;
      case RelationshipTypeEnum['Information Type']:
        this.selectedTypeMap = this.informationTypeMap;
        break;
      case RelationshipTypeEnum['State Enumeration']:
        this.listMap = this.stateEnumerationMap;
        this.supplementalMap = this.stateMap;
        this.isList = true;
        break;
      case RelationshipTypeEnum.State:
        this.selectedTypeMap = this.stateMap;
        break;
      default:
        break;
    }
  }

  public onValueChange(event: MatSelectChange): void {
    this.parentFormGroup.controls[this.formProperty].setValue(event);
  }
}

@NgModule({
  declarations: [
    RelationshipTypePickerComponent
  ],
  exports: [
    RelationshipTypePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RelationshipTypePickerModule {}
