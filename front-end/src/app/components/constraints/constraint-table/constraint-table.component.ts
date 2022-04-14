import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output } from '@angular/core';

import { Constraint } from 'src/app/models';
import { TableComponent } from '../../table/table.component';

@Component({
  selector: 'sm-constraint-table',
  styleUrls: [ '../../table/table.component.css' ],
  templateUrl: '../../table/table.component.html'
})
export class ConstraintTableComponent extends TableComponent<Constraint> implements OnInit, OnChanges {
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
      //'externalLink',
      'type',
      'version'
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
