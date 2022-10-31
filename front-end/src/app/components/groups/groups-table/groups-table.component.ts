import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Group } from '../../../models';
import { TableComponent, TableModule } from '../../table/table.component';
import { getItemNameOrIdentifier } from '../../../functions/helpers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-groups-table',
  styleUrls: ['../../table/table.component.css'],
  templateUrl: 'groups-table.component.html'
})
export class GroupsTableComponent extends TableComponent<Group> implements OnChanges, OnInit {
  @Input() public groups: Group[];

  @Output() public groupSelected: EventEmitter<Group>;

  public getItemNameOrIdentifierFunc = getItemNameOrIdentifier;

  constructor() {
    super();

    this.groupSelected = new EventEmitter<Group>();
    this.isTree = true;
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

  public onRowClick(group: Group): void {
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
    TableModule
  ]
})
export class GroupsTableModule { }
