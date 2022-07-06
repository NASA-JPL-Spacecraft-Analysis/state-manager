import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgModule,
  OnChanges,
  Output,
  ViewChild
} from '@angular/core';

import { AutoCompleteSetType, AutoCompleteType } from '../../models';
import { getItemNameOrIdentifier } from '../../functions/helpers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-auto-complete',
  styleUrls: ['auto-complete.component.css'],
  templateUrl: 'auto-complete.component.html'
})
export class AutoCompleteComponent implements OnChanges {
  @Input() public itemSet: AutoCompleteSetType;
  @Input() public multiselect: boolean;
  @Input() public selectedItemIds: string[];

  @Output() public itemRemoved: EventEmitter<AutoCompleteType>;
  @Output() public itemSelected: EventEmitter<AutoCompleteType[]>;

  @ViewChild('autocomplete') autocomplete: ElementRef;

  public dropdownOpen: boolean;
  public filteredItems: AutoCompleteType[];
  public getItemNameOrIdentifierFunc = getItemNameOrIdentifier;
  public selectedItems: AutoCompleteSetType;

  // The max number of items we show inside our autocomplete.
  public readonly MAX_SHOWN_ITEMS = 30;

  constructor() {
    this.itemRemoved = new EventEmitter();
    this.itemSelected = new EventEmitter();
  }

  @HostListener('document:click', ['$event'])
  public clickout(event: Event) {
    if (this.autocomplete && !this.autocomplete.nativeElement.contains(event.target) && this.dropdownOpen) {
      this.dropdownOpen = false;
    }
  }

  public ngOnChanges(): void {
    if (this.itemSet) {
      this.selectedItems = new Set();

      for (const item of this.itemSet.values()) {
        if (this.selectedItemIds.indexOf(item.id) !== -1) {
          this.selectedItems.add(item);

          if (this.multiselect) {
            this.itemSet.delete(item);
          }
        }
      }

      this.filteredItems = [...this.itemSet];
    }
  }

  // As the user types, filter down our items and only show up to the max.
  public onFilter(event: any): void {
    const filter = event.target.value.toLowerCase();

    if (filter === '') {
      this.filteredItems = [...this.itemSet.values()];
    } else {
      this.filteredItems = [...this.itemSet.values()].filter(item => {
        let searchContext: string;

        // Prepend the item's name / identifier / label with the type to improve searching.
        if ('type' in item) {
          searchContext = item.type + ' - ';
        } else {
          searchContext = 'group - ';
        }

        if ('label' in item) {
          // label is a property of a State Enumeration.
          searchContext += item.label.toLowerCase();
        } else if ('name' in item) {
          // Name is a property of a Command Expansion.
          searchContext += item.name.toLowerCase();
        } else if ('identifier' in item) {
          // Identifier is a property of everything else.
          searchContext += item.identifier.toLowerCase();
        }

        return searchContext.includes(filter);
      });
    }
  }

  /**
   * Called when a user deletes a selected item.
   *
   * @param item The item user is removing.
   */
  public onRemoveSelected(item: AutoCompleteType): void {
    this.selectedItems.delete(item);

    if (this.multiselect) {
      this.itemSet.add(item);
    }

    this.itemRemoved.emit(item);
  }

  public onSelectItem(item: AutoCompleteType): void {
    this.dropdownOpen = false;

    if (this.multiselect) {
      this.selectedItems.add(item);

      this.itemSet.delete(item);
    } else {
      this.selectedItems = new Set([item]);
    }

    this.itemSelected.emit([...this.selectedItems.values()]);
  }
}

@NgModule({
  declarations: [
    AutoCompleteComponent
  ],
  exports: [
    AutoCompleteComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class AutoCompleteModule { }
