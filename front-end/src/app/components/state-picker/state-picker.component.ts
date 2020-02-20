import { Component, ChangeDetectionStrategy, NgModule, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { MaterialModule } from 'src/app/material';
import { StateVariableMap, Relationship } from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'state-picker',
  styleUrls: [ 'state-picker.component.css' ],
  templateUrl: 'state-picker.component.html'
})
export class StatePickerComponent implements OnChanges {
  @Input() public parentFormGroup: FormGroup;
  @Input() public relationship: Relationship;
  @Input() public stateVariableMap: StateVariableMap;

  public ngOnChanges(): void {
    this.parentFormGroup.addControl('subjectStateId', new FormControl(this.relationship.subjectStateId, [ Validators.required ]));
    this.parentFormGroup.addControl('targetStateId', new FormControl(this.relationship.targetStateId, [ Validators.required ]));
  }

  public onSubjectStateIdChange(event: MatSelectChange): void {
    this.parentFormGroup.controls.subjectStateId.setValue(event.value);
  }

  public onTargetStateIdChange(event: MatSelectChange): void {
    this.parentFormGroup.controls.targetStateId.setValue(event.value);
  }
}

@NgModule({
  declarations: [
    StatePickerComponent
  ],
  exports: [
    StatePickerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class StatePickerModule {}
