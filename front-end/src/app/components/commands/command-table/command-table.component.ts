import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

import { Command } from 'src/app/models';
import { TableComponent } from '../../table/table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-command-table',
  styleUrls: [ '../../table/table.component.css' ],
  templateUrl: '../../table/table.component.html'
})
export class CommandTableComponent extends TableComponent<Command> implements OnInit, OnChanges {
  @Input() public commands: Command[];
  @Input() public history: boolean;

  @Output() public commandSelected: EventEmitter<Command>;

  constructor() {
    super();

    this.commandSelected = new EventEmitter<Command>();
  }

  public ngOnInit(): void {
    this.columns.push(
      'identifier',
      'displayName',
      'description',
      'externalLink',
      'type',
      'version'
    );

    if (this.history) {
      this.columns.push(
        'commandId',
        'updated'
      );

      this.historyTable = true;
    }
  }

  public ngOnChanges(): void {
    this.rows = this.commands;

    super.ngOnChanges();
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
    CommonModule
  ]
})
export class CommandTableModule {}
