import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MaterialModule } from 'src/app/material';
import { Command, CommandMap } from 'src/app/models';
import { TableComponent } from '../../table/table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'command-table',
  styleUrls: [ 'command-table.component.css' ],
  templateUrl: 'command-table.component.html'
})
export class CommandTableComponent extends TableComponent<Command> implements OnInit, OnChanges {
  @Input() public commandMap: CommandMap;
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
    const commands: Command[] = [];

    if (this.commandMap && this.displayedColumns) {
      const keys = Object.keys(this.commandMap);

      for (const key of keys) {
        commands.push(this.commandMap[key]);
      }

      this.dataSource = new MatTableDataSource(commands);

      super.ngOnChanges();
    }

    this.showCommandTable = this.commandMap && commands.length > 0;
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
