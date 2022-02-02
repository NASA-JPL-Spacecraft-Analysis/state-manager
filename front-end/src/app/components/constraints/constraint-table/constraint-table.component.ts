import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output } from '@angular/core';

import { Constraint } from 'src/app/models';
import { StellarTableComponent } from '../../stellar-table/stellar-table.component';

@Component({
  selector: 'sm-constraint-table',
  styleUrls: [ '../../stellar-table/stellar-table.component.css' ],
  templateUrl: '../../stellar-table/stellar-table.component.html'
})
export class ConstraintTableComponent extends StellarTableComponent<Constraint> implements OnInit, OnChanges {
  @Input() public constraints: Constraint[];
  @Input() public history: boolean;

  @Output() public constraintSelected: EventEmitter<Constraint>;

  public showConstraintTable: boolean;

  constructor() {
    super();

    this.constraintSelected = new EventEmitter<Constraint>();
  }

  public ngOnInit(): void {
    this.columns.push(
      'identifier',
      'displayName',
      'description',
      'externalLink',
      'type'
    );

    if (this.history) {
      this.columns.push(
        'constraintId',
        'updated'
      );

      this.historyTable = true;
    }
  }

  public ngOnChanges(): void {
    this.rows = this.constraints;

    super.ngOnChanges();
  }

  public onRowClick(constraint: Constraint) {
    this.constraintSelected.emit(constraint);
  }
}

@NgModule({
  declarations: [
    ConstraintTableComponent
  ],
  exports: [
    ConstraintTableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ConstraintTableModule {}
