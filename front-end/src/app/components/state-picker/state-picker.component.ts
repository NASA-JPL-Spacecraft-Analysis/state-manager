import { Component, ChangeDetectionStrategy, NgModule, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MaterialModule } from 'src/app/material';
import { Relationship } from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'state-picker',
  styleUrls: [ 'state-picker.component.css' ],
  templateUrl: 'state-picker.component.html'
})
export class StatePickerComponent implements OnInit {
  @Input() public identifiers: Set<string>;
  @Input() public formControlName: string;
  @Input() public parentFormGroup: FormGroup;
  @Input() public relationship: Relationship;

  public separatorKeysCodes: number[] = [ ENTER, COMMA ];

  public ngOnInit(): void {
    this.parentFormGroup.addControl(this.formControlName, new FormControl(this.relationship.subjectStates, [ Validators.required ]));
  }

  public add(test: any): void {
    console.log(test);
  }

  public remove(identifier: string): void {
    console.log(identifier);
  }

  public selected(): void {

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
