import { EventEmitter, Component, NgModule, ChangeDetectionStrategy, Input, Output, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MaterialModule } from 'src/app/material';
import { EventMap, Group, GroupItemType, GroupMapping, IdentifierMap, InformationTypeMap, StateMap, StringTMap } from 'src/app/models';
import { IdentifierFormModule } from '../../identifier-form/identifier-form.component';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { StateManagementConstants } from 'src/app/constants/state-management.constants';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'groups-sidenav',
  styleUrls: [ 'groups-sidenav.component.css' ],
  templateUrl: 'groups-sidenav.component.html'
})
export class GroupsSidenavComponent implements OnChanges {
  @Input() public eventMap: EventMap;
  @Input() public group: Group;
  @Input() public groupNameMap: IdentifierMap;
  @Input() public informationTypeMap: InformationTypeMap;
  @Input() public selectedCollectionId: string;
  @Input() public stateMap: StateMap;

  @Output() public deleteGroup: EventEmitter<boolean>;
  @Output() public modifyGroup: EventEmitter<Group>;
  @Output() public showError: EventEmitter<string>;

  @ViewChild('itemSelector') public itemSelector: MatSelect;

  public collectionItems: GroupItemType[];
  public formGroup: FormGroup;
  public groupMappings: GroupMapping[];
  public newGroup: Group;
  public originalGroupName: string;
  public selectedItem: GroupItemType;

  private isDuplicateGroupName: boolean;
  private groupItemMap: Map<string, GroupItemType>;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon('clear', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));

    this.deleteGroup = new EventEmitter<boolean>();
    this.modifyGroup = new EventEmitter<Group>();
    this.showError = new EventEmitter<string>();
  }

  public ngOnChanges(): void {
    this.collectionItems = [];
    this.groupItemMap = new Map();

    if (this.group) {
      this.newGroup = {
        ...this.group
      };

      this.groupMappings = [
        ...this.group.groupMappings
      ];
    } else {
      this.newGroup = {
        collectionId: this.selectedCollectionId,
        groupMappings: [],
        id: undefined,
        name: ''
      };

      this.groupMappings = [];
    }

    this.populateGroupItemMap();

    this.addToCollectionItems(this.informationTypeMap);
    this.addToCollectionItems(this.eventMap);
    this.addToCollectionItems(this.stateMap);

    this.originalGroupName = this.newGroup.name;

    this.formGroup = new FormGroup({
      name: new FormControl(this.newGroup.name, [ Validators.required ]),
      groupMappings: new FormControl(this.newGroup.groupMappings, [ Validators.required ])
    });
  }

  public onCancel(): void {
    this.modifyGroup.emit(undefined);
  }

  public onDeleteItem(item: GroupItemType): void {
    // Remove the item from our mappings.
    this.groupMappings = this.groupMappings.filter(mapping => mapping.item.id !== item.id);

    // Remove the item from the map of group items.
    this.groupItemMap.delete(item.id);

    // Add the item back to the list of selectable items.
    this.collectionItems.push(item);
  }

  public onDeleteGroup(): void {
    this.deleteGroup.emit(true);
  }

  public onDuplicateGroupName(duplicateGroupName: boolean): void {
    this.isDuplicateGroupName = duplicateGroupName;
  }

  public onGroupNameChange(groupName: string): void {
    this.newGroup.name = groupName;
    this.formGroup.get('name').setValue(groupName);
  }

  /**
   * When an item is selected, add it to the groupItemMap and remove it 
   * from the collectionItems list.
   * @param item The item that the user selected.
   */
  public onItemSelect(change: MatSelectChange): void {
    const value: GroupItemType = change.value;

    this.groupItemMap.set(value.id, value);
    this.groupMappings.push({
      id: '',
      item: value,
      itemId: value.id
    });

    // Remove the item from out collection item list.
    this.collectionItems = this.collectionItems.filter(item => item.id !== value.id);

    this.itemSelector.value = null;
  }

  public onSubmit(): void {
    if (!this.isDuplicateGroupName && this.newGroup.name !== '') {
      if (this.validateGroupName(this.newGroup.name)) {
        this.formGroup.get('groupMappings').setValue(this.groupMappings);

        const groupMappingIds = [];

        // Pull out just the item ids so we can save the mappings.
        for (const mapping of this.groupMappings) {
          groupMappingIds.push({
            itemId: mapping.item.id
          });
        }

        this.newGroup.groupMappings = groupMappingIds;

        this.modifyGroup.emit(this.newGroup);
      } else {
        this.showError.emit('Your group name contains invalid characters, please only use alphanumerics and underscores');
      }
    } else {
      this.showError.emit('Please provide a unique group name');
    }
  }

  /**
   * Populate a list of all of the valid items that can be added to a group.
   * This list contains events, information types, and states.
   * @param itemMap The map of items for a given type.
   */
  private addToCollectionItems(itemMap: StringTMap<GroupItemType>): void {
    if (itemMap) {
      for (const item of Object.keys(itemMap)) {
        // Only add an item if it isn't already in this group.
        if (!this.groupItemMap.has(itemMap[item].id)) {
          this.collectionItems.push(itemMap[item]);
        }
      }
    }
  }

  /** 
   * Create a map of item ids to items for our current group.
   * Only try and populate the map if our group has items in it.
  */
  private populateGroupItemMap(): void {
    if (this.newGroup.groupMappings.length > 0) {
      for (const index of Object.keys(this.newGroup.groupMappings)) {
        const item = this.newGroup.groupMappings[index].item;

        this.groupItemMap.set(item.id, item);
      }
    }
  }

  private validateGroupName(name: string): boolean {
    return new RegExp(StateManagementConstants.groupNameRegex).test(name);
  }
}

@NgModule({
  declarations: [
    GroupsSidenavComponent
  ],
  exports: [
    GroupsSidenavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IdentifierFormModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class GroupsSidenavModule {}
