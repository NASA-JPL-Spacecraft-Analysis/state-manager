import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Group } from '../../../models';
import { TableComponent, TableModule } from '../../table/table.component';
import { GroupsTableRowModule } from './groups-table-row/groups-table-row.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-groups-table',
  styleUrls: ['../../table/table.component.css'],
  templateUrl: 'groups-table.component.html'
})
export class GroupsTableComponent extends TableComponent<Group> implements OnChanges, OnInit {
  @Input() public groups: Group[];
  @Input() public selectedGroup: Group;

  @Output() public groupSelected: EventEmitter<Group>;

  constructor() {
    super();

    this.groupSelected = new EventEmitter<Group>();
  }

  public ngOnInit(): void {
    this.columns.push(
      'identifier'
    );
  }

  public ngOnChanges(): void {
    this.convertListData(this.groups);

    super.ngOnChanges();
  }


  public onGroupSelected(group: Group): void {
    this.groupSelected.emit(group);
  }
}

@NgModule({
  declarations: [
    GroupsTableComponent
  ],
  exports: [
    GroupsTableComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    GroupsTableRowModule,
    TableModule
  ]
})
export class GroupsTableModule { }
