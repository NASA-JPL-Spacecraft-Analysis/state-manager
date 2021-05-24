import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { MaterialModule } from 'src/app/material';
import { Constraint, ConstraintMap } from 'src/app/models';

@Component({
  selector: 'constraint-table',
  styleUrls: [ 'constraint-table.component.css' ],
  templateUrl: 'constraint-table.component.html'
})
export class ConstraintTableComponent implements OnInit, OnChanges {
  @Input() public constraintMap: ConstraintMap;
  @Input() public history: boolean;

  @Output() public constraintSelected: EventEmitter<Constraint>;

  public dataSource: MatTableDataSource<Constraint>;
  public displayedColumns: string[];
  public showConstraintTable: boolean;

  constructor() {
    this.displayedColumns = [];
    this.constraintSelected = new EventEmitter<Constraint>();
  }

  public ngOnInit(): void {
    this.displayedColumns.push(
      'identifier',
      'displayName',
      'description',
      'externalLink',
      'type'
    );

    if (this.history) {
      this.displayedColumns.push(
        'constraintId',
        'updated'
      );
    }
  }

  public ngOnChanges(): void {
    if (this.constraintMap && this.displayedColumns) {
      this.dataSource = new MatTableDataSource([ ...Object.values(this.constraintMap) ]);
    }

    this.showConstraintTable = this.constraintMap && Object.keys(this.constraintMap).length > 0;
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
    CommonModule,
    MaterialModule
  ]
})
export class ConstraintTableModule {}
