import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MaterialModule } from 'src/app/material';
import { Constraint, ConstraintMap } from 'src/app/models';
import { TableComponent } from '../../table/table.component';

@Component({
  selector: 'constraint-table',
  styleUrls: [ 'constraint-table.component.css' ],
  templateUrl: 'constraint-table.component.html'
})
export class ConstraintTableComponent extends TableComponent<Constraint> implements OnInit, OnChanges {
  @Input() public constraintMap: ConstraintMap;
  @Input() public history: boolean;

  @Output() public constraintSelected: EventEmitter<Constraint>;

  public showConstraintTable: boolean;

  constructor() {
    super();

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
    const constraints: Constraint[] = [];

    if (this.constraintMap && this.displayedColumns) {
      const keys = Object.keys(this.constraintMap);

      for (const key of keys) {
        constraints.push(this.constraintMap[key]);
      }

      this.dataSource = new MatTableDataSource(constraints);

      super.ngOnChanges();
    }

    this.showConstraintTable = this.constraintMap && constraints.length > 0;
  }

  public onRowClick(constraint: Constraint) {
    this.constraintSelected.emit(constraint);
  }

  public filter(constraint: Constraint, filterValue: string): boolean {
    return constraint.description?.toLowerCase().includes(filterValue)
      || constraint.displayName?.toLowerCase().includes(filterValue)
      || constraint.externalLink?.toLowerCase().includes(filterValue)
      || constraint.identifier?.toLowerCase().includes(filterValue)
      || constraint.type?.toLowerCase().includes(filterValue);
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
