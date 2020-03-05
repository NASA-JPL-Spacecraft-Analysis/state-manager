import { Component, NgModule, ChangeDetectionStrategy, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { Relationship } from '../../models/relationship';
import { StatePickerModule } from '../state-picker/state-picker.component';
import { MaterialModule } from 'src/app/material';
import { StateVariableMap } from 'src/app/models';
import { StateManagementConstants } from 'src/app/constants/state-management.constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'relationships-sidenav',
  styleUrls: [ 'relationships-sidenav.component.css' ],
  templateUrl: 'relationships-sidenav.component.html'
})
export class RelationshipsSidenavComponent implements OnChanges {
  @Input() public relationship: Relationship;
  @Input() public stateVariableMap: StateVariableMap;

  @Output() public formError: EventEmitter<string>;
  @Output() public modifyRelationship: EventEmitter<Relationship>;

  public newRelationship: Relationship;
  public form: FormGroup;
  public relationshipTypes: string[];
  public selectedType: string;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon('clear', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));

    this.formError = new EventEmitter<string>();
    this.modifyRelationship = new EventEmitter<Relationship>();

    this.relationshipTypes = StateManagementConstants.relationshipTypes;
  }

  public ngOnChanges(): void {
    if (this.relationship === undefined) {
      this.newRelationship = {
        id: null,
        displayName: '',
        description: '',
        subjectStateId: null,
        targetStateId: null,
        type: '',
        targetName: ''
      };
    } else {
      this.newRelationship = {
        ...this.relationship
      };

      this.selectedType = this.newRelationship.type;
    }

    this.form = new FormGroup({
      id: new FormControl(this.newRelationship.id),
      displayName: new FormControl(this.newRelationship.displayName, [ Validators.required ]),
      description: new FormControl(this.newRelationship.description),
      type: new FormControl(this.newRelationship.type, [ Validators.required ]),
      targetName: new FormControl(this.newRelationship.targetName)
    });
  }

  public onCancel(): void {
    this.modifyRelationship.emit(undefined);
  }

  public onSubmit(): void {
    this.form.controls.type.setValue(this.selectedType);

    /**
     * If the user is saving a state relationship, there shouldn't be a targetName.
     * If the user is saving any other type of relationship, there shouldn't be a subject or state variable.
     */
    if (this.form.value.type === 'State') {
      this.form.controls.targetName.setValue(null);

      this.form.setErrors(this.subjectTargetStateValidator());
    } else {
      this.form.controls.targetStateId.setValue(null);
      this.form.controls.subjectStateId.setValue(null);

      this.form.setErrors(this.targetNameValidator());
    }

    if (this.form.valid) {
      this.modifyRelationship.emit(this.form.value);
    } else {
      this.formError.emit('Please fill in required form fields, including selecting a subject and target state, or a target name');
    }
  }

  private subjectTargetStateValidator(): ValidationErrors {
    const formValue = this.form.value;

    if (formValue.subjectStateId !== null
        && formValue.targetStateId !== null) {
      return null;
    }

    return {
      subjectTargetStateError: true
    };
  }

  private targetNameValidator(): ValidationErrors {
    const formValue = this.form.value;

    if (formValue.targetName !== null
      && formValue.targetName !== undefined
      && formValue.targetName !== '') {
      return null;
    }

    return {
      targetNameError: true
    };
  }
}

@NgModule({
  declarations: [
    RelationshipsSidenavComponent
  ],
  exports: [
    RelationshipsSidenavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StatePickerModule
  ]
})
export class RelationshipsSidenavModule {}
