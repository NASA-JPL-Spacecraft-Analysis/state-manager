import {
  EventEmitter,
  Component,
  NgModule,
  ChangeDetectionStrategy,
  Input,
  Output,
  OnChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { cloneDeep } from 'lodash';

import { MaterialModule } from 'src/app/material';
import {
  EventMap,
  Group,
  IdentifierMap,
  InformationTypeMap,
  CommandMap,
  ConstraintMap,
  StateEnumerationMap,
  AutoCompleteType,
  AutoCompleteSetType,
  StateMap
} from 'src/app/models';
import { IdentifierFormModule } from '../../identifier-form/identifier-form.component';
import { AutoCompleteModule } from '../../autocomplete/auto-complete.component';
import {
  populateItems,
  populateItemsWithCommandsAndChildren,
  populateItemsWithList
} from '../../../functions/helpers';
import { StateManagementConstants } from '../../../constants';

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
  @Input() public groupMap: Record<string, Group>;
  @Input() public groupIdentifierMap: IdentifierMap;
  @Input() public informationTypeMap: InformationTypeMap;
  @Input() public selectedCollectionId: string;
  @Input() public stateEnumerationMap: StateEnumerationMap;
  @Input() public stateMap: StateMap;

  @Output() public modifyGroup: EventEmitter<Group>;
  @Output() public showError: EventEmitter<string>;

  public formGroup: FormGroup;
  // Keeps track of the currently selectable items.
  public itemSet: AutoCompleteSetType;
  public newGroup: Group;
  public originalGroupIdentifier: string;
  public selectedItem: AutoCompleteType;
  public selectedItemIds: string[];

  private isDuplicateGroupIdentifier: boolean;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIcon(
      'clear',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg')
    );

    this.modifyGroup = new EventEmitter<Group>();
    this.showError = new EventEmitter<string>();
  }

  public ngOnChanges(): void {
    this.itemSet = new Set();

    // If we're updating a group, remove it from the set so the user can't add it as a group item.
    if (this.group?.id) {
      delete this.groupMap[this.group.id];
    }

    this.itemSet = populateItemsWithCommandsAndChildren(this.itemSet, this.commandMap);
    this.itemSet = populateItems(this.itemSet, this.constraintMap);
    this.itemSet = populateItems(this.itemSet, this.eventMap);
    this.itemSet = populateItems(this.itemSet, this.groupMap);
    this.itemSet = populateItems(this.itemSet, this.informationTypeMap);
    this.itemSet = populateItemsWithList(this.itemSet, this.stateEnumerationMap);
    this.itemSet = populateItems(this.itemSet, this.stateMap);

    if (this.group?.id && this.itemSet.has(this.group)) {
      this.itemSet.delete(this.group);
    }

    if (this.group) {
      this.newGroup = cloneDeep(this.group);
    } else {
      this.newGroup = {
        collectionId: this.selectedCollectionId,
        groupMappings: [],
        id: undefined,
        identifier: ''
      };
    }

    this.selectedItemIds = this.newGroup.groupMappings.map((item) => item.item.id);

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
   * When the user removed an item from the autocomplete, delete the mapping for it.
   *
   * @param removedItem The item the user removed.
   */
  public onItemRemoved(removedItem: AutoCompleteType): void {
    this.newGroup.groupMappings = this.newGroup.groupMappings.filter(
      (groupMapping) => groupMapping.item.id !== removedItem.id
    );
  }

  /**
   * When an item is selected, add it to the groupItemMap.
   *
   * @param groupItemList The list of items that the user has selected.
   */
  public onItemSelected(selectedItems: AutoCompleteType[] | undefined): void {
    this.newGroup.groupMappings = [];

    for (const item of selectedItems) {
      const groupMapping = {
        id: undefined,
        item,
        itemId: item.id
      };

      this.newGroup.groupMappings.push(groupMapping);
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
        this.showError.emit(
          'Your group identifier contains invalid characters, please only use alphanumerics and underscores'
        );
      }
    } else {
      this.showError.emit('Please provide a unique group identifier');
    }
  }

  private validateGroupIdentifier(identifier: string): boolean {
    return new RegExp(StateManagementConstants.groupIdentifierRegex).test(identifier);
  }
}

@NgModule({
  declarations: [GroupsSidenavComponent],
  exports: [GroupsSidenavComponent],
  imports: [
    AutoCompleteModule,
    CommonModule,
    FormsModule,
    IdentifierFormModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class GroupsSidenavModule {}
