import { Component, NgModule, ChangeDetectionStrategy, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Relationship } from '../../models/relationship';
import { RelationshipTypePickerModule } from '../relationship-type-picker/relationship-type-picker.component';
import {
  StateMap,
  InformationTypeMap,
  EventMap,
  RelationshipTypeEnum,
  CommandMap,
  ConstraintMap,
  CommandArgumentMap,
  StateEnumerationMap
} from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-relationship-sidenav',
  styleUrls: ['relationship-sidenav.component.css'],
  templateUrl: 'relationship-sidenav.component.html'
})
export class RelationshipSidenavComponent implements OnChanges {
  @Input() public commandArgumentMap: CommandArgumentMap;
  @Input() public commandMap: CommandMap;
  @Input() public constraintMap: ConstraintMap;
  @Input() public eventMap: EventMap;
  @Input() public informationTypeMap: InformationTypeMap;
  @Input() public relationship: Relationship;
  @Input() public stateEnumerationMap: StateEnumerationMap;
  @Input() public stateMap: StateMap;

  @Output() public formError: EventEmitter<string>;
  @Output() public modifyRelationship: EventEmitter<Relationship>;

  public newRelationship: Relationship;
  public form: FormGroup;
  public types: string[];
  public subjectType: string;
  public targetType: string;

  constructor() {
    this.formError = new EventEmitter<string>();
    this.modifyRelationship = new EventEmitter<Relationship>();

    this.types = Object.values(RelationshipTypeEnum).filter(value => typeof value === 'string');
  }

  public ngOnChanges(): void {
    this.filterTypes();
    if (this.relationship === undefined || this.relationship === null) {
      this.newRelationship = {
        id: null,
        displayName: '',
        description: '',
        subjectType: null,
        targetType: null,
        subjectTypeId: null,
        targetTypeId: null
      };
    } else {
      this.newRelationship = {
        ...this.relationship
      };

      this.subjectType = this.newRelationship.subjectType;
      this.targetType = this.newRelationship.targetType;
    }

    this.form = new FormGroup({
      id: new FormControl(this.newRelationship.id),
      displayName: new FormControl(this.newRelationship.displayName, [Validators.required]),
      description: new FormControl(this.newRelationship.description),
      subjectType: new FormControl(this.newRelationship.subjectType, [Validators.required]),
      targetType: new FormControl(this.newRelationship.targetType, [Validators.required])
    });
  }

  public onCancel(): void {
    this.modifyRelationship.emit(undefined);
  }

  public onSubmit(): void {
    this.form.controls.subjectType.setValue(this.subjectType);
    this.form.controls.targetType.setValue(this.targetType);

    if (this.form.valid) {
      this.modifyRelationship.emit(this.form.value);
    } else {
      this.formError.emit('Please fill in required form fields, including selecting a subject and a target');
    }
  }

  public onSubjectTypeChange(newSubjectType: string) {
    this.subjectType = newSubjectType;
  }

  public onTargetTypeChange(newTargetType: string) {
    this.targetType = newTargetType;
  }

  /**
   * Looks at each map and removes the ones that don't have any data.
   */
  private filterTypes(): void {
    this.types = Object.values(RelationshipTypeEnum).filter(type => {
      if (typeof type === 'string') {
        switch (type) {
          case RelationshipTypeEnum.Command:
            if (Object.keys(this.commandMap).length > 0) {
              return true;
            }
            break;
          case RelationshipTypeEnum['Command Argument']:
            if (Object.keys(this.commandArgumentMap).length > 0) {
              return true;
            }
            break;
          case RelationshipTypeEnum.Constraint:
            if (Object.keys(this.constraintMap).length > 0) {
              return true;
            }
            break;
          case RelationshipTypeEnum.Event:
            if (Object.keys(this.eventMap).length > 0) {
              return true;
            }
            break;
          case RelationshipTypeEnum['Information Type']:
            if (Object.keys(this.informationTypeMap).length > 0) {
              return true;
            }
            break;
          case RelationshipTypeEnum['State Enumeration']:
            if (Object.keys(this.stateEnumerationMap).length > 0) {
              return true;
            }
            break;
          case RelationshipTypeEnum.State:
            if (Object.keys(this.stateMap).length > 0) {
              return true;
            }
            break;
        }
      }
    });
  }
}

@NgModule({
  declarations: [
    RelationshipSidenavComponent
  ],
  exports: [
    RelationshipSidenavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RelationshipTypePickerModule
  ]
})
export class RelationshipSidenavModule { }
