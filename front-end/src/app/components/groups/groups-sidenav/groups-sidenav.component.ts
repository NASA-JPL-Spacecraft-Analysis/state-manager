import { EventEmitter, Component, NgModule, ChangeDetectionStrategy, Input, Output, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MaterialModule } from 'src/app/material';
import { EventMap, Group, GroupItemType, GroupMapping, IdentifierMap, InformationTypeMap, StateMap, StringTMap } from 'src/app/models';
import { IdentifierFormModule } from '../../identifier-form/identifier-form.component';
import { StateManagementConstants } from 'src/app/constants/state-management.constants';
import { AutocompleteInputModule } from '../../autocomplete-input/autocomplete-input.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'groups-sidenav',
  styleUrls: [ 'groups-sidenav.component.css' ],
  templateUrl: 'groups-sidenav.component.html'
})
export class GroupsSidenavComponent implements OnChanges {
  @Input() public eventMap: EventMap;
  @Input() public group: Group;
  @Input() public groupIdentifierMap: IdentifierMap;
  @Input() public informationTypeMap: InformationTypeMap;
  @Input() public selectedCollectionId: string;
  @Input() public stateMap: StateMap;

  @Output() public deleteGroup: EventEmitter<boolean>;
  @Output() public modifyGroup: EventEmitter<Group>;
  @Output() public showError: EventEmitter<string>;

  public collectionItems: GroupItemType[];
  public formGroup: FormGroup;
  public groupMappings: GroupMapping[];
  public newGroup: Group;
  public originalGroupIdentifier: string;
  public selectedItem: GroupItemType;

  private isDuplicateGroupIdentifier: boolean;
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
        identifier: ''
      };

      this.groupMappings = [];
    }

    this.populateGroupItemMap();

    this.addToCollectionItems(this.informationTypeMap);
    this.addToCollectionItems(this.eventMap);
    this.addToCollectionItems(this.stateMap);

    this.originalGroupIdentifier = this.newGroup.identifier;

    this.formGroup = new FormGroup({
      identifier: new FormControl(this.newGroup.identifier, [ Validators.required ]),
      groupMappings: new FormControl(this.newGroup.groupMappings, [ Validators.required ])
    });
  }

  public onCancel(): void {
    this.modifyGroup.emit(undefined);
  }

  public onDeleteGroup(): void {
    this.deleteGroup.emit(true);
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
   * @param groupItemList The list of items that the user has selected.
   */
  public onItemSelect(groupItemList: GroupItemType[]): void {
    this.groupMappings = [];

    for (const groupItem of groupItemList) {
      this.groupMappings.push({
        id: '',
        item: groupItem,
        itemId: groupItem.id
      });

      this.groupItemMap.set(groupItem.id, groupItem);

      // Remove the item from our collection item list.
      // FIXME: This doesn't actually remove it from the list for some reason.
      this.collectionItems = this.collectionItems.filter(item => item.id !== groupItem.id);
    }
  }

  public onSubmit(): void {
    if (!this.isDuplicateGroupIdentifier && this.newGroup.identifier !== '') {
      if (this.validateGroupIdentifier(this.newGroup.identifier)) {
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
        this.showError.emit('Your group identifier contains invalid characters, please only use alphanumerics and underscores');
      }
    } else {
      this.showError.emit('Please provide a unique group identifier');
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
    AutocompleteInputModule,
    CommonModule,
    FormsModule,
    IdentifierFormModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class GroupsSidenavModule {}
