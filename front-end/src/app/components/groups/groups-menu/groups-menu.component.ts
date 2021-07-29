import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output } from '@angular/core';

import { MaterialModule } from 'src/app/material';
import { Group } from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'groups-menu',
  styleUrls: [ 'groups-menu.component.css' ],
  templateUrl: 'groups-menu.component.html'
})
export class GroupsMenuComponent {
  @Input() public groups: Group[];

  @Output() public groupSelected: EventEmitter<Group>;

  constructor() {
    this.groupSelected = new EventEmitter<Group>();
  }

  public onGroupSelected(group: Group): void {
    this.groupSelected.emit(group);
  }
}

@NgModule({
  declarations: [
    GroupsMenuComponent
  ],
  exports: [
    GroupsMenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class GroupsMenuModule {}
