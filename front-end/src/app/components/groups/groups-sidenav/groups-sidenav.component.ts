import { EventEmitter, Component, NgModule, ChangeDetectionStrategy, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MaterialModule } from 'src/app/material';
import {
  EventMap,
  Group,
  GroupMap,
  GroupItemType,
  GroupMapping,
  IdentifierMap,
  InformationTypeMap,
  StateMap,
  CommandMap,
  ConstraintMap
} from 'src/app/models';
import { IdentifierFormModule } from '../../identifier-form/identifier-form.component';
import { StateManagementConstants } from 'src/app/constants/state-management.constants';
import { GroupItemSelectorModule } from '../group-item-selector/group-item-selector.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-groups-sidenav',
  styleUrls: ['groups-sidenav.component.css'],
  templateUrl: 'groups-sidenav.component.html'
})
export class GroupsSidenavComponent implements OnChanges {
  @Input() public commandMap: CommandMap;
  @Input() public constraintMap: ConstraintMap;
  @Input() public eventMap: EventMap;
  @Input() public group: Group;
  @Input() public groupMap: GroupMap;
  @Input() public groupIdentifierMap: IdentifierMap;
  @Input() public informationTypeMap: InformationTypeMap;
  @Input() public selectedCollectionId: string;
  @Input() public stateMap: StateMap;

  @Output() public modifyGroup: EventEmitter<Group>;
  @Output() public showError: EventEmitter<string>;

  public collectionItems: GroupItemType[];
  public formGroup: FormGroup;
  // Keeps track of the currently selectable items.
  public itemList: GroupItemType[];
  public newGroup: Group;
  public originalGroupIdentifier: string;
  public selectedItem: GroupItemType;
  public selectedItems: GroupItemType[];

  private isDuplicateGroupIdentifier: boolean;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon('clear', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));

    this.modifyGroup = new EventEmitter<Group>();
    this.showError = new EventEmitter<string>();
  }

  public ngOnChanges(): void {
    this.collectionItems = [];
    this.selectedItems = [];

    this.addToCollectionItems(this.commandMap);
    this.addToCollectionItems(this.constraintMap);
    this.addToCollectionItems(this.eventMap);
    this.addToCollectionItems(this.groupMap);
    this.addToCollectionItems(this.informationTypeMap);
    this.addToCollectionItems(this.stateMap);

    // Copy our collectionItems so we can remove items that are already selected later.
    this.itemList = [
      ...this.collectionItems
    ];

    if (this.group) {
      this.newGroup = {
        ...this.group,
        groupMappings: [
          ...this.group.groupMappings.map(groupMapping => { return { ...groupMapping } })
        ]
      };

      for (const groupMapping of this.group.groupMappings) {
        this.selectedItems.push(groupMapping.item);
        this.filterItemList(groupMapping);
      }
    } else {
      this.newGroup = {
        collectionId: this.selectedCollectionId,
        groupMappings: [],
        id: undefined,
        identifier: ''
      };
    }


    // If we're updating a group, remove it from the map so the user can't add it as a group item.
    if (this.newGroup.id) {
      delete this.groupMap[this.newGroup.id];
    }

    this.originalGroupIdentifier = this.newGroup.identifier;

    this.formGroup = new FormGroup({
      identifier: new FormControl(this.newGroup.identifier, [Validators.required]),
      groupMappings: new FormControl(this.newGroup.groupMappings, [Validators.required])
    });
  }

  public onCancel(): void {
    this.modifyGroup.emit(undefined);
  }

  public onDuplicateGroupIdentifier(duplicateGroupIdentifier: boolean): void {
    this.isDuplicateGroupIdentifier = duplicateGroupIdentifier;
  }

  public onGroupIdentifierChange(identifier: string): void {
    this.newGroup.identifier = identifier;
    this.formGroup.get('identifier').setValue(identifier);
  }

  /**
   * When an item is selected, add it to the groupItemMap and remove it
   * from the collectionItems list.
   *
   * @param groupItemList The list of items that the user has selected.
   */
  public onItemSelect(groupItemList: GroupItemType[]): void {
    // Reset our itemList to keep it up to date with added / removed groups.
    this.itemList = [
      ...this.collectionItems
    ];

    this.newGroup.groupMappings = [];

    for (const groupItem of groupItemList) {
      const groupMapping = {
        id: undefined,
        item: groupItem,
        itemId: undefined
      };

      this.newGroup.groupMappings.push(groupMapping);

      this.filterItemList(groupMapping);
    }
  }

  public onSubmit(): void {
    if (!this.isDuplicateGroupIdentifier && this.newGroup.identifier !== '') {
      if (this.validateGroupIdentifier(this.newGroup.identifier)) {
        this.formGroup.get('groupMappings').setValue(this.newGroup.groupMappings);

        const groupMappingIds = [];

        // Pull out just the item ids so we can save the mappings.
        for (const mapping of this.newGroup.groupMappings) {
          groupMappingIds.push({
            itemId: mapping.item.id
          });
        }

        this.newGroup.groupMappings = groupMappingIds;

        this.modifyGroup.emit(this.newGroup);
      } else {
        this.showError.emit('Your group identifier contains invalid characters, please only use alphanumerics and underscores');
      }
    } else {
      this.showError.emit('Please provide a unique group identifier');
    }
  }

  /**
   * Populate a list of all of the valid items that can be added to a group.
   * This list contains events, information types, and states.
   *
   * @param itemMap The map of items for a given type.
   */
  private addToCollectionItems(itemMap: Record<string, GroupItemType>): void {
    if (itemMap) {
      for (const item of Object.keys(itemMap)) {
        this.collectionItems.push(itemMap[item]);
      }
    }
  }

  private filterItemList(groupMapping: GroupMapping): void {
    this.itemList = this.itemList.filter(item => item.id !== groupMapping.item.id);
  }

  private validateGroupIdentifier(identifier: string): boolean {
    return new RegExp(StateManagementConstants.groupIdentifierRegex).test(identifier);
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
    GroupItemSelectorModule,
    IdentifierFormModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class GroupsSidenavModule { }
