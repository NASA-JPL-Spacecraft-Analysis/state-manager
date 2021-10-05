import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MaterialModule } from 'src/app/material';
import { Command } from 'src/app/models';
import { TableComponent } from '../../table/table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'command-table',
  styleUrls: [ 'command-table.component.css' ],
  templateUrl: 'command-table.component.html'
})
export class CommandTableComponent extends TableComponent<Command> implements OnInit, OnChanges {
  @Input() public commands: Command[];
  @Input() public history: boolean;

  @Output() public commandSelected: EventEmitter<Command>;

  public showCommandTable: boolean;

  constructor() {
    super();

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

      super.ngOnChanges();
    }

    this.showCommandTable = this.commands && this.commands.length > 0;
  }

  public onRowClick(command: Command) {
    this.commandSelected.emit(command);
  }

  public filter(command: Command, filterValue: string): boolean {
    return command.description?.toLowerCase().includes(filterValue)
      || command.displayName?.toLowerCase().includes(filterValue)
      || command.externalLink?.toLowerCase().includes(filterValue)
      || command.identifier?.toLowerCase().includes(filterValue)
      || command.type?.toLowerCase().includes(filterValue);
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
