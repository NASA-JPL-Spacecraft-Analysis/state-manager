import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { MaterialModule } from 'src/app/material';
import { Constraint, IdentifierMap } from 'src/app/models';
import { IdentifierFormModule } from '../../identifier-form/identifier-form.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'constraint-sidenav',
  styleUrls: [ 'constraint-sidenav.component.css' ],
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
  public originalIdentifier: string;
  public selectedType: string;

  private isDuplicateIdentifier: boolean;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon('clear', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));

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
        type: ''
      };
    } else {
      this.newConstraint = {
        ...this.constraint
      };
    }

    this.originalIdentifier = this.newConstraint.identifier;
    this.selectedType = this.newConstraint.type;

    this.form = new FormGroup({
      collectionId: new FormControl(this.newConstraint.collectionId),
      description: new FormControl(this.newConstraint.description),
      displayName: new FormControl(this.newConstraint.displayName),
      editable: new FormControl(this.newConstraint.editable),
      externalLink: new FormControl(this.newConstraint.externalLink),
      id: new FormControl(this.newConstraint.id),
      identifier: new FormControl(this.newConstraint.identifier),
      type: new FormControl(this.selectedType, [ Validators.required ])
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
      this.form.value.type = this.selectedType;

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
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ConstraintSidenavModule {}
