import { Component, NgModule, ChangeDetectionStrategy, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationType } from 'src/app/models';
import { StellarTableComponent } from '../stellar-table/stellar-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-information-type-table',
  styleUrls: [ './../stellar-table/stellar-table.component.css' ],
  templateUrl: './../stellar-table/stellar-table.component.html'
})
export class InformationTypeTableComponent extends StellarTableComponent<InformationType> implements OnInit, OnChanges {
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
      'externalLink'
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
