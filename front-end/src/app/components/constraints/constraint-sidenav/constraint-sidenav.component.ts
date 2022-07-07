import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Constraint, IdentifierMap } from 'src/app/models';
import { IdentifierFormModule } from '../../identifier-form/identifier-form.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-constraint-sidenav',
  styleUrls: ['constraint-sidenav.component.css'],
  templateUrl: 'constraint-sidenav.component.html'
})
export class ConstraintSidenavComponent implements OnChanges {
  @Input() public constraint: Constraint;
  @Input() public constraintIdentifierMap: IdentifierMap;
  @Input() public constraintTypes: string[];

  @Output() public duplicateIdentifier: EventEmitter<boolean>;
  @Output() public modifyConstraint: EventEmitter<Constraint>;

  public form: FormGroup;
  public newConstraint: Constraint;

  private isDuplicateIdentifier: boolean;

  constructor() {
    this.duplicateIdentifier = new EventEmitter<boolean>();
    this.modifyConstraint = new EventEmitter<Constraint>();
  }

  public ngOnChanges(): void {
    if (!this.constraint) {
      this.newConstraint = {
        collectionId: undefined,
        description: '',
        displayName: '',
        editable: true,
        externalLink: '',
        id: undefined,
        identifier: '',
        type: '',
        version: '',
      };
    } else {
      this.newConstraint = {
        ...this.constraint
      };
    }

    this.form = new FormGroup({
      collectionId: new FormControl(this.newConstraint.collectionId),
      description: new FormControl(this.newConstraint.description),
      displayName: new FormControl(this.newConstraint.displayName),
      editable: new FormControl(this.newConstraint.editable),
      externalLink: new FormControl(this.newConstraint.externalLink),
      id: new FormControl(this.newConstraint.id),
      identifier: new FormControl(this.newConstraint.identifier, [Validators.required]),
      type: new FormControl(this.newConstraint.type, [Validators.required]),
      version: new FormControl(this.newConstraint.version)
    });
  }

  public onCancel(): void {
    this.modifyConstraint.emit(undefined);
  }

  public onDuplicateIdentifier(duplicateIdentifier: boolean): void {
    this.isDuplicateIdentifier = duplicateIdentifier;
  }

  public onIdentifierChange(identifier: string): void {
    this.newConstraint.identifier = identifier;
    this.form.get('identifier').setValue(identifier);
  }

  public onSubmit(): void {
    if (!this.isDuplicateIdentifier) {
      this.modifyConstraint.emit(this.form.value);
    } else {
      this.duplicateIdentifier.emit(true);
    }
  }
}

@NgModule({
  declarations: [
    ConstraintSidenavComponent
  ],
  exports: [
    ConstraintSidenavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IdentifierFormModule,
    ReactiveFormsModule
  ]
})
export class ConstraintSidenavModule { }
