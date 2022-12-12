import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output } from '@angular/core';

import { getItemNameOrIdentifier } from '../../../../functions/helpers';
import { Group } from '../../../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-groups-table-row',
  templateUrl: 'groups-table-row.component.html',
  styleUrls: ['groups-table-row.component.css']
})
export class GroupsTableRowComponent {
  @Input() public columns: string[];
  @Input() public depth: number;
  @Input() public row: Group;
  @Input() public selectedGroup: Group;

  @Output() public groupSelected: EventEmitter<Group>;

  public expanded: boolean;
  public getItemNameOrIdentifierFunc = getItemNameOrIdentifier;

  constructor() {
    this.groupSelected = new EventEmitter<Group>();
  }

  public onExpandToggle(): void {
    this.expanded = !this.expanded;
  }

  public onRowClick(group: Group): void {
    this.groupSelected.emit(group);
  }

  public incDepth(): number {
    return this.depth++;
  }
}

@NgModule({
  declarations: [
    GroupsTableRowComponent
  ],
  exports: [
    GroupsTableRowComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GroupsTableRowModule { }
