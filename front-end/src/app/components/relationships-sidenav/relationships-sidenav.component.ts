import { Component, NgModule, ChangeDetectionStrategy, OnChanges, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { Relationship } from '../../models/relationship';
import { StatePickerModule } from '../state-picker/state-picker.component';
import { MaterialModule } from 'src/app/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'relationships-sidenav',
  styleUrls: [ 'relationships-sidenav.component.css' ],
  templateUrl: 'relationships-sidenav.component.html'
})
export class RelationshipsSidenavComponent implements OnChanges {
  @Input() public identifiers: Set<string>;
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
      displayName: new FormControl(this.newRelationship.displayName, [ Validators.required ]),
      description: new FormControl(this.newRelationship.description)
    });
  }

  public onCancel(): void {

  }

  public onSubmit(): void {

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
