import { Component, NgModule, ChangeDetectionStrategy, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationType } from 'src/app/models';
import { TableComponent } from '../table/table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-information-type-table',
  styleUrls: [ './../table/table.component.css' ],
  templateUrl: './../table/table.component.html'
})
export class InformationTypeTableComponent extends TableComponent<InformationType> implements OnInit, OnChanges {
  @Input() public informationTypes: InformationType[];

  constructor() {
    super();
  }

  public ngOnInit(): void {
    this.columns.push(
      'id',
      'type',
      'identifier',
      'displayName',
      'description',
      //'externalLink',
      'version'
    );
  }

  public ngOnChanges(): void {
    if (this.informationTypes) {
      this.rows = this.informationTypes;
    }

    super.ngOnChanges();
  }
}

@NgModule({
  declarations: [
    InformationTypeTableComponent
  ],
  exports: [
    InformationTypeTableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InformationTypeTableModule {}
