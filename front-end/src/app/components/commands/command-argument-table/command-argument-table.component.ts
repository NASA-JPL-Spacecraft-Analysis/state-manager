import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MaterialModule } from 'src/app/material';
import { Command, CommandArgumentHistory } from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'command-argument-table',
  styleUrls: [ 'command-argument-table.component.css' ],
  templateUrl: 'command-argument-table.component.html'
})
export class CommandArgumentTableComponent implements OnInit, OnChanges {
  @Input() public commandArgumentHistory: CommandArgumentHistory[];

  public dataSource: MatTableDataSource<CommandArgumentHistory>;
  public displayedColumns: string[];
  public showTable: boolean;

  constructor() {
    this.displayedColumns = [];
  }

  public ngOnInit(): void {
    this.displayedColumns.push(
      'commandId',
      'commandArgumentId',
      'id',
      'name',
      'sortOrder',
      'updated'
    );
  }

  public ngOnChanges(): void {
    if (this.commandArgumentHistory && this.displayedColumns) {
      this.dataSource = new MatTableDataSource(this.commandArgumentHistory);
    }

    this.showTable = this.commandArgumentHistory && this.commandArgumentHistory.length > 0;
  }
}

@NgModule({
  declarations: [
    CommandArgumentTableComponent
  ],
  exports: [
    CommandArgumentTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class CommandArgumentTableModule {}
