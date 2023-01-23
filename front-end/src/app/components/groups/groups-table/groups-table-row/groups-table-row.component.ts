import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output
} from '@angular/core';

import { getItemNameOrIdentifier } from '../../../../functions/helpers';
import { Group } from '../../../../models';
import { ValidationService } from '../../../../services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-groups-table-row',
  templateUrl: 'groups-table-row.component.html',
  styleUrls: ['groups-table-row.component.css']
})
export class GroupsTableRowComponent implements OnInit {
  @Input() public columns: string[];
  @Input() public depth: number;
  @Input() public row: Group;
  @Input() public selectedGroup: Group;

  @Output() public groupSelected: EventEmitter<Group>;

  public expanded: boolean;
  public getItemNameOrIdentifierFunc = getItemNameOrIdentifier;

  constructor(public validationService: ValidationService) {
    this.groupSelected = new EventEmitter<Group>();
  }

  public ngOnInit(): void {
    this.depth += 1;
  }

  public calcIndentation(depth: number): { 'padding-left': string } {
    let indentation = 0;

    for (let i = 0; i < depth; i++) {
      indentation += 32;
    }

    return {
      'padding-left': `${indentation}px`
    };
  }

  public onExpandToggle(): void {
    this.expanded = !this.expanded;
  }

  public onRowClick(group: Group): void {
    this.groupSelected.emit(group);
  }
}

@NgModule({
  declarations: [GroupsTableRowComponent],
  exports: [GroupsTableRowComponent],
  imports: [CommonModule]
})
export class GroupsTableRowModule {}
