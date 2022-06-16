import { Component, NgModule, ChangeDetectionStrategy, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Relationship } from '../../models/relationship';
import {
  StateMap,
  InformationTypeMap,
  EventMap,
  RelationshipTypeEnum,
  CommandMap,
  ConstraintMap,
  CommandArgumentMap,
  StateEnumerationMap,
  AutoCompleteListType,
  AutoCompleteType
} from 'src/app/models';
import { AutoCompleteModule } from '../autocomplete/auto-complete.component';

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
  public items: AutoCompleteListType;

  constructor() {
    this.formError = new EventEmitter<string>();
    this.modifyRelationship = new EventEmitter<Relationship>();
  }

  public ngOnChanges(): void {
    this.items = [];

    this.populateItems(this.commandMap);
    this.populateItemsWithList(this.commandArgumentMap);
    this.populateItems(this.constraintMap);
    this.populateItems(this.eventMap);
    this.populateItems(this.informationTypeMap);
    this.populateItemsWithList(this.stateEnumerationMap);
    this.populateItems(this.stateMap);

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
    }

    this.form = new FormGroup({
      id: new FormControl(this.newRelationship.id),
      displayName: new FormControl(this.newRelationship.displayName, [Validators.required]),
      description: new FormControl(this.newRelationship.description),
      subjectType: new FormControl(this.newRelationship.subjectType, [Validators.required]),
      subjectTypeId: new FormControl(this.newRelationship.subjectTypeId, [Validators.required]),
      targetType: new FormControl(this.newRelationship.targetType, [Validators.required]),
      targetTypeId: new FormControl(this.newRelationship.targetTypeId, [Validators.required])
    });
  }

  public onCancel(): void {
    this.modifyRelationship.emit(undefined);
  }

  public onSubjectSelected(subjectIds: string[] | undefined): void {
    const subjectId = subjectIds ? subjectIds[0] : undefined;

    this.form.controls.subjectType.setValue(this.findType(subjectId));
    this.form.controls.subjectTypeId.setValue(subjectId);
  }

  public onTargetSelected(targetIds: string[] | undefined): void {
    const targetId = targetIds ? targetIds[0] : undefined;

    this.form.controls.targetType.setValue(this.findType(targetId));
    this.form.controls.targetTypeId.setValue(targetId);
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.modifyRelationship.emit(this.form.value);
    } else {
      this.formError.emit('Please fill in required form fields, including selecting a subject and a target');
    }
  }

  private populateItems(items: Record<string, AutoCompleteType>): void {
    if (items) {
      for (const item of Object.values(items)) {
        this.items.push(item);
      }
    }
  }

  private populateItemsWithList(itemMap: CommandArgumentMap | StateEnumerationMap): void {
    if (itemMap && Object.keys(itemMap).length > 0) {
      for (const itemList of Object.values(itemMap)) {
        for (const item of itemList) {
          this.items.push(item);
        }
      }
    }
  }

  /**
   * Looks at each map and removes the ones that don't have any data.
   */
  private findType(id: string): string | undefined {
    if (!id) {
      return undefined;
    }

    for (const command of Object.values(this.commandMap)) {
      if (command.id === id) {
        return RelationshipTypeEnum.Command;
      }
    }

    for (const commandArgumentList of Object.values(this.commandArgumentMap)) {
      for (const commandArgument of Object.values(commandArgumentList)) {
        if (commandArgument.id === id) {
          return RelationshipTypeEnum['Command Argument'];
        }
      }
    }

    for (const constraint of Object.values(this.constraintMap)) {
      if (constraint.id === id) {
        return RelationshipTypeEnum.Constraint;
      }
    }

    for (const event of Object.values(this.eventMap)) {
      if (event.id === id) {
        return RelationshipTypeEnum.Event;
      }
    }

    for (const informationType of Object.values(this.informationTypeMap)) {
      if (informationType.id === id) {
        return RelationshipTypeEnum['Information Type'];
      }
    }

    for (const stateEnumerationList of Object.values(this.stateEnumerationMap)) {
      for (const stateEnumeration of Object.values(stateEnumerationList)) {
        if (stateEnumeration.id === id) {
          return RelationshipTypeEnum['State Enumeration'];
        }
      }
    }

    for (const state of Object.values(this.stateMap)) {
      if (state.id === id) {
        return RelationshipTypeEnum.State;
      }
    }
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
    AutoCompleteModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RelationshipSidenavModule { }
