import { Component, NgModule, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StateEnumeration } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-enum-form',
  styleUrls: [ 'enum-form.component.css' ],
  templateUrl: 'enum-form.component.html'
})
export class EnumFormComponent implements OnChanges {
  @Input() collectionId: string;
  @Input() deletedEnumerationIds: string[];
  @Input() enumerations: StateEnumeration[];

  public enumerationsLabel: string;

  public ngOnChanges(): void {
    this.updateEnumerationsLabel();
  }

  // Add a new blank enumeration.
  public onAddEnumeration(): void {
    this.enumerations.push({
      collectionId: this.collectionId,
      id: undefined,
      stateId: undefined,
      label: '',
      value: ''
    });

    this.updateEnumerationsLabel();
  }

  // Remove the deleted enumeration and then emit the current list of enumerations.
  public onDeleteEnumeration(enumeration: StateEnumeration): void {
    this.enumerations.splice(this.enumerations.indexOf(enumeration), 1);

    // Only try and save the id of enumerations that have an id.
    if (enumeration.id) {
      this.deletedEnumerationIds.push(enumeration.id);
    }

    this.updateEnumerationsLabel();
  }

  private updateEnumerationsLabel(): void {
    this.enumerationsLabel = this.enumerations.length + ' Enum';

    if (this.enumerations.length !== 1) {
      this.enumerationsLabel += 's';
    }
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
    FormsModule
  ]
})
export class EnumFormModule {}
