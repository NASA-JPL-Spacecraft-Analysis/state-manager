import { Component, NgModule, ChangeDetectionStrategy, OnChanges, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Relationship } from '../../models/relationship';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'relationship-sidenav',
  styleUrls: [ 'relationship-sidenav.component.css' ],
  templateUrl: 'relationship-sidenav.component.html'
})
export class RelationshipSidenavComponent implements OnChanges {
  @Input() public relationship: Relationship;

  public newRelationship: Relationship;
  public form: FormGroup;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon('clear', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));
  }

  public ngOnChanges(): void {
    if (this.relationship === undefined) {
      this.newRelationship = {
        displayName: '',
        description: '',
        targetStates: [],
        subjectStates: [],
        type: ''
      };
    } else {
      this.newRelationship = {
        ...this.relationship
      };
    }

    this.form = new FormGroup({
      displayName: new FormControl(this.newRelationship.displayName, [ Validators.required ])
    });
  }

  public onCancel(): void {

  }

  public onSubmit(): void {

  }
}

@NgModule({
  declarations: [
    RelationshipSidenavComponent
  ],
  exports: [
    RelationshipSidenavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ]
})
export class RelationshipSidenavModule {}
