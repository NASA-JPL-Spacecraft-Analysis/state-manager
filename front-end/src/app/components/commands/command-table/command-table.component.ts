import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MaterialModule } from 'src/app/material';
import { Command } from 'src/app/models';

@Component({
  selector: 'command-table',
  styleUrls: [ 'command-table.component.css' ],
  templateUrl: 'command-table.component.html'
})
export class CommandTableComponent implements OnInit, OnChanges {
  @Input() public commands: Command[];
  @Input() public history: boolean;

  @Output() public commandSelected: EventEmitter<Command>;

  public dataSource: MatTableDataSource<Command>;
  public displayedColumns: string[];
  public showCommandTable: boolean;

  constructor() {
    this.displayedColumns = [];
    this.commandSelected = new EventEmitter<Command>();
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
        'commandId',
        'updated'
      );
    }
  }

  public ngOnChanges(): void {
    if (this.commands && this.displayedColumns) {
      this.dataSource = new MatTableDataSource(this.commands);
    }

    this.showCommandTable = this.commands && this.commands.length > 0;
  }

  public onRowClick(command: Command) {
    this.commandSelected.emit(command);
  }
}

@NgModule({
  declarations: [
    CommandTableComponent
  ],
  exports: [
    CommandTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class CommandTableModule {}
