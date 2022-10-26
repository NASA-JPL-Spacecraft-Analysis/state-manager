import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output } from '@angular/core';

import { Group } from '../../../models';
import { TableComponent } from '../../table/table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-groups-table',
  styleUrls: ['../../table/table.component.css'],
  templateUrl: '../../table/table.component.html'
})
export class GroupsTableComponent extends TableComponent<Group> implements OnChanges, OnInit {
  @Input() public groups: Group[];

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
    CommonModule
  ]
})
export class GroupsTableModule { }
