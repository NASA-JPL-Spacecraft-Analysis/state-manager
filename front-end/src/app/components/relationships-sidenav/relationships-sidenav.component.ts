import { Component, NgModule, ChangeDetectionStrategy, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { Relationship } from '../../models/relationship';
import { StatePickerModule } from '../state-picker/state-picker.component';
import { MaterialModule } from 'src/app/material';
import { StateVariableMap } from 'src/app/models';

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

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon('clear', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));

    this.formError = new EventEmitter<string>();
    this.modifyRelationship = new EventEmitter<Relationship>();
  }

  public ngOnChanges(): void {
    if (this.relationship === undefined) {
      this.newRelationship = {
        id: null,
        displayName: '',
        description: '',
        subjectStateId: null,
        targetStateId: null
      };
    } else {
      this.newRelationship = {
        ...this.relationship
      };
    }

    this.form = new FormGroup({
      id: new FormControl(this.newRelationship.id),
      displayName: new FormControl(this.newRelationship.displayName, [ Validators.required ]),
      description: new FormControl(this.newRelationship.description)
    });
  }

  public onCancel(): void {
    this.modifyRelationship.emit(undefined);
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.modifyRelationship.emit(this.form.value);
    } else {
      this.formError.emit('Please fill in required form fields, including selecting a subject and target state');
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
    StatePickerModule
  ]
})
export class RelationshipsSidenavModule {}
