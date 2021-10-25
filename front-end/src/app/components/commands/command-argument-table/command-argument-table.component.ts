import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, OnChanges, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MaterialModule } from 'src/app/material';
import { CommandArgument, CommandArgumentHistory } from 'src/app/models';
import { TableComponent } from '../..';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'command-argument-table',
  styleUrls: [ 'command-argument-table.component.css' ],
  templateUrl: 'command-argument-table.component.html'
})
export class CommandArgumentTableComponent extends TableComponent<CommandArgument> implements OnInit, OnChanges {
  @Input() public commandArgumentHistory: CommandArgumentHistory[];

  constructor() {
    super();
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

      super.ngOnChanges();
    }
  }

  public filter(commandArgumentHistory: CommandArgumentHistory, filterValue: string): boolean {
    return commandArgumentHistory.name?.toLowerCase().includes(filterValue);
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
