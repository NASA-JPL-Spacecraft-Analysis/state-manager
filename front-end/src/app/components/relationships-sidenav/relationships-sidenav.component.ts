import { Component, NgModule, ChangeDetectionStrategy, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { Relationship } from '../../models/relationship';
import { RelationshipTypePickerModule } from '../relationship-type-picker/relationship-type-picker.component';
import { MaterialModule } from 'src/app/material';
import { StateVariableMap, InformationTypesMap } from 'src/app/models';
import { StateManagementConstants } from 'src/app/constants/state-management.constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'relationships-sidenav',
  styleUrls: [ 'relationships-sidenav.component.css' ],
  templateUrl: 'relationships-sidenav.component.html'
})
export class RelationshipsSidenavComponent implements OnChanges {
  @Input() public informationTypesMap: InformationTypesMap;
  @Input() public relationship: Relationship;
  @Input() public stateVariableMap: StateVariableMap;

  @Output() public formError: EventEmitter<string>;
  @Output() public modifyRelationship: EventEmitter<Relationship>;

  public newRelationship: Relationship;
  public form: FormGroup;
  public informationTypes: string[];
  public subjectType: string;
  public targetType: string;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon('clear', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));

    this.formError = new EventEmitter<string>();
    this.modifyRelationship = new EventEmitter<Relationship>();

    this.informationTypes = StateManagementConstants.relationshipTypes;
  }

  public ngOnChanges(): void {
    if (this.relationship === undefined) {
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

      this.subjectType = this.newRelationship.subjectType.toString();
      this.targetType = this.newRelationship.targetType.toString();
    }

    this.form = new FormGroup({
      id: new FormControl(this.newRelationship.id),
      displayName: new FormControl(this.newRelationship.displayName, [ Validators.required ]),
      description: new FormControl(this.newRelationship.description),
      subjectType: new FormControl(this.newRelationship.subjectType, [ Validators.required ]),
      targetType: new FormControl(this.newRelationship.targetType, [ Validators.required ])
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
    RelationshipTypePickerModule
  ]
})
export class RelationshipsSidenavModule {}
