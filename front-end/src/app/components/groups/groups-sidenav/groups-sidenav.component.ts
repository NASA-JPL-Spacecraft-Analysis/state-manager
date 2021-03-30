import { EventEmitter, Component, NgModule, ChangeDetectionStrategy, Input, Output, OnChanges, Injectable, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material';
import { EventMap, Group, GroupItemType, GroupMapping, InformationTypesMap, StateMap, StringTMap } from 'src/app/models';
import { IdentifierFormModule } from '../../identifier-form/identifier-form.component';
import { MatSelect, MatSelectChange } from '@angular/material/select';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'groups-sidenav',
  styleUrls: [ 'groups-sidenav.component.css' ],
  templateUrl: 'groups-sidenav.component.html'
})
export class GroupsSidenavComponent implements OnChanges {
  @Input() public eventMap: EventMap;
  @Input() public group: Group;
  @Input() public groupNameMap: Map<string, string>;
  @Input() public informationTypesMap: InformationTypesMap;
  @Input() public selectedCollectionId: string;
  @Input() public stateMap: StateMap;

  @Output() public duplicateGroupName: EventEmitter<boolean>;
  @Output() public modifyGroup: EventEmitter<Group>;

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
    private changeDetectorRef: ChangeDetectorRef,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon('clear', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));

    this.duplicateGroupName = new EventEmitter<boolean>();
    this.modifyGroup = new EventEmitter<Group>();
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

    this.addToCollectionItems(this.eventMap);
    this.addToCollectionItems(this.stateMap);

    for (const informationType of Object.keys(this.informationTypesMap)) {
      this.addToCollectionItems(this.informationTypesMap[informationType]);
    }

    this.originalGroupName = this.newGroup.name;

    this.formGroup = new FormGroup({
      name: new FormControl(this.newGroup.name)
    });
  }

  public onCancel(): void {
    this.modifyGroup.emit(undefined);
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

    this.collectionItems = [ ...this.collectionItems ];

    this.itemSelector.value = null;
    this.changeDetectorRef.markForCheck();
  }

  public onSubmit(): void {
    if (!this.isDuplicateGroupName) {
      this.modifyGroup.emit(this.formGroup.value);
    } else {
      this.duplicateGroupName.emit(true);
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
