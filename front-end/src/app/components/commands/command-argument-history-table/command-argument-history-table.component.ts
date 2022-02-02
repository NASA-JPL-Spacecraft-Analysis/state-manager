import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, OnChanges, OnInit } from '@angular/core';

import { CommandArgument, CommandArgumentHistory } from 'src/app/models';
import { StellarTableComponent } from '../../stellar-table/stellar-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-command-argument-history-table',
  styleUrls: [ '../../stellar-table/stellar-table.component.css' ],
  templateUrl: '../../stellar-table/stellar-table.component.html'
})
export class CommandArgumentHistoryTableComponent extends StellarTableComponent<CommandArgument> implements OnInit, OnChanges {
  @Input() public commandArgumentHistory: CommandArgumentHistory[];

  constructor() {
    super();
  }

  public ngOnInit(): void {
    this.columns.push(
      'commandId',
      'commandArgumentId',
      'id',
      'name',
      'sortOrder',
      'updated'
    );
  }

  public ngOnChanges(): void {
    this.rows = this.commandArgumentHistory;

    super.ngOnChanges();
  }

  public filter(commandArgumentHistory: CommandArgumentHistory, filterValue: string): boolean {
    return commandArgumentHistory.name?.toLowerCase().includes(filterValue);
  }
}

@NgModule({
  declarations: [
    CommandArgumentHistoryTableComponent
  ],
  exports: [
    CommandArgumentHistoryTableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommandArgumentHistoryTableModule {}
