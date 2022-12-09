import {
  Component,
  NgModule,
  ChangeDetectionStrategy,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
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
  AutoCompleteSetType,
  AutoCompleteType
} from 'src/app/models';
import { AutoCompleteModule } from '../autocomplete/auto-complete.component';
import {
  populateItems,
  populateItemsWithCommandsAndChildren,
  populateItemsWithList
} from '../../functions/helpers';

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
  public itemSet: AutoCompleteSetType;

  constructor() {
    this.formError = new EventEmitter<string>();
    this.modifyRelationship = new EventEmitter<Relationship>();
  }

  public ngOnChanges(): void {
    this.itemSet = new Set();

    this.itemSet = populateItemsWithCommandsAndChildren(this.itemSet, this.commandMap);
    this.itemSet = populateItems(this.itemSet, this.constraintMap);
    this.itemSet = populateItems(this.itemSet, this.eventMap);
    this.itemSet = populateItems(this.itemSet, this.informationTypeMap);
    this.itemSet = populateItemsWithList(this.itemSet, this.stateEnumerationMap);
    this.itemSet = populateItems(this.itemSet, this.stateMap);

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

  public onSubjectRemoved(removedItem: AutoCompleteType): void {
    this.form.controls.subjectType.setValue(undefined);
    this.form.controls.subjectTypeId.setValue(undefined);
  }

  public onSubjectSelected(selectedItems: AutoCompleteType[] | undefined): void {
    const subjectId = selectedItems ? selectedItems[0].id : undefined;

    this.form.controls.subjectType.setValue(this.findType(subjectId));
    this.form.controls.subjectTypeId.setValue(subjectId);
  }

  public onTargetRemoved(removedItem: AutoCompleteType): void {
    this.form.controls.targetType.setValue(undefined);
    this.form.controls.targetTypeId.setValue(undefined);
  }

  public onTargetSelected(selectedItems: AutoCompleteType[] | undefined): void {
    const targetId = selectedItems ? selectedItems[0].id : undefined;

    this.form.controls.targetType.setValue(this.findType(targetId));
    this.form.controls.targetTypeId.setValue(targetId);
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.modifyRelationship.emit(this.form.value);
    } else {
      this.formError.emit(
        'Please fill in required form fields, including selecting a subject and a target'
      );
    }
  }

  /**
   * TODO: This can be cleaned up in the future.
   * Rather than looking at each list of types and finding the corresponding object by id, keep a map
   * of ids -> RelationshipTypeEnums that we populate when the component is created, or is passed into this component.
   */
  private findType(id: string): string | undefined {
    if (!id) {
      return undefined;
    }

    for (const command of Object.values(this.commandMap)) {
      if (command.id === id) {
        return RelationshipTypeEnum.Command;
      }

      for (const commandArgument of command.arguments) {
        if (commandArgument.id === id) {
          return RelationshipTypeEnum['Command Argument'];
        }

        for (const commandArgumentEnumeration of commandArgument.enumerations) {
          if (commandArgumentEnumeration.id === id) {
            return RelationshipTypeEnum['Command Argument Enumeration'];
          }
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
  declarations: [RelationshipSidenavComponent],
  exports: [RelationshipSidenavComponent],
  imports: [AutoCompleteModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RelationshipSidenavModule {}
