import { Component, ChangeDetectionStrategy, NgModule, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { MaterialModule } from 'src/app/material';
import {
  StateMap,
  Relationship,
  InformationTypeMap,
  EventMap,
  ConstraintMap,
  CommandMap
} from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-relationship-type-picker',
  styleUrls: [ 'relationship-type-picker.component.css' ],
  templateUrl: 'relationship-type-picker.component.html'
})
export class RelationshipTypePickerComponent implements OnChanges {
  @Input() public commandMap: CommandMap;
  @Input() public constraintMap: ConstraintMap;
  @Input() public eventMap: EventMap;
  @Input() public informationTypeMap: InformationTypeMap;
  @Input() public isSubject: boolean;
  @Input() public parentFormGroup: FormGroup;
  @Input() public relationship: Relationship;
  @Input() public stateMap: StateMap;
  @Input() public type: string;

  public formProperty: string;
  public title: string;

  public ngOnChanges(): void {
    if (this.isSubject) {
      this.title = 'Subject';
      this.formProperty = 'subjectTypeId';

      this.parentFormGroup.addControl(this.formProperty, new FormControl(this.relationship.subjectTypeId, [ Validators.required]));
    } else {
      this.title = 'Target';
      this.formProperty = 'targetTypeId';

      this.parentFormGroup.addControl(this.formProperty, new FormControl(this.relationship.targetTypeId, [ Validators.required]));
    }
  }

  public checkDisabled(key: string, selectedStateId: number): boolean {
    return parseInt(key, 10) === selectedStateId;
  }

  public onValueChange(event: MatSelectChange): void {
    this.parentFormGroup.controls[this.formProperty].setValue(event.value);
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
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class RelationshipTypePickerModule {}
