import { Component, ChangeDetectionStrategy, NgModule, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

import { StateVariable } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'state-variable-table',
  styleUrls: [ 'state-variable-table.component.css' ],
  templateUrl: 'state-variable-table.component.html'
})
export class StateVariableTableComponent implements OnChanges {
  @Input() public stateVariables: StateVariable[];
  @Output() public editStateVariable: EventEmitter<StateVariable>;

  public dataSource: MatTableDataSource<StateVariable>;
  public displayedColumns: string[] = [
    'identifier',
    'displayName',
    'type',
    'units',
    'source',
    'description',
    'actions'
  ];

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {
    this.iconRegistry.addSvgIcon('more_vert', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/more_vert.svg'));

    this.editStateVariable = new EventEmitter<StateVariable>();
  }

  public ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.stateVariables);

    this.dataSource.filterPredicate = this.filter;
  }

  public editState(stateVariable: StateVariable): void {
    this.editStateVariable.emit(stateVariable);
  }

  /**
   * Called when the user inputs a character into our filter. We need to clean the filter up before actually
   * using it.
   *
   * @param filterValue The filter the user has entered.
   */
  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();

    this.dataSource.filter = filterValue;
  }

  // Filter by our state variable's type to start with.
  private filter(stateVariable: StateVariable, filterValue: string): boolean {
    return stateVariable.type.toLowerCase().includes(filterValue);
  }
}

@NgModule({
  declarations: [
    StateVariableTableComponent
  ],
  exports: [
    StateVariableTableComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule
  ]
})
export class StateVariableTableModule {}
