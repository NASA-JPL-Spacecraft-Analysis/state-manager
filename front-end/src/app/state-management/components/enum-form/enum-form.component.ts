import { Component, NgModule, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DomSanitizer } from '@angular/platform-browser';

import { StateEnumeration } from '../../models';

@Component({
  selector: 'enum-form',
  styleUrls: [ 'enum-form.component.css' ],
  templateUrl: 'enum-form.component.html'
})
export class EnumFormComponent implements OnChanges {
  @Input() enumerations: StateEnumeration[];

  public enumerationsLabel: string;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon('add', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg'));
    this.iconRegistry.addSvgIcon('clear', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));
  }

  public ngOnChanges(): void {
    this.updateEnumerationsLabel();
  }

  public updateEnumerationsLabel(): void {
    this.enumerationsLabel = this.enumerations.length + ' Enum';

    if (this.enumerations.length !== 1) {
      this.enumerationsLabel += 's';
    }
  }

  // Add a new blank enumeration.
  public onAddEnumeration(): void {
    this.enumerations.push({
      id: null,
      stateVariableId: null,
      label: '',
      value: null
    });

    this.updateEnumerationsLabel();
  }

  // Remove the deleted enumeration and then emit the current list of enumerations.
  public onDeleteEnumeration(enumeration: StateEnumeration): void {
    this.enumerations.splice(this.enumerations.indexOf(enumeration), 1);

    this.updateEnumerationsLabel();
  }
}

@NgModule({
  declarations: [
    EnumFormComponent
  ],
  exports: [
    EnumFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ]
})
export class EnumFormModule {}
