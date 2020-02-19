import { Component, ChangeDetectionStrategy, NgModule, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

import { MaterialModule } from 'src/app/material';
import { StateVariableMap } from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'state-picker',
  styleUrls: [ 'state-picker.component.css' ],
  templateUrl: 'state-picker.component.html'
})
export class StatePickerComponent implements OnInit {
  @Input() public formControlName: string;
  @Input() public formControlValue: number;
  @Input() public parentFormGroup: FormGroup;
  @Input() public selectLabel: string;
  @Input() public stateVariableMap: StateVariableMap;

  public ngOnInit(): void {
    this.parentFormGroup.addControl(this.formControlName, new FormControl(this.formControlValue, [ Validators.required ]));
  }

  public onSelectionChange(event: MatSelectChange): void {
    this.parentFormGroup.controls[this.formControlName].setValue(event.value);
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
