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

import { AutoCompleteListType, AutoCompleteType } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-auto-complete',
  styleUrls: ['auto-complete.component.css'],
  templateUrl: 'auto-complete.component.html'
})
export class AutoCompleteComponent implements OnChanges {
  @Input() public items: AutoCompleteListType;
  @Input() public multiselect: boolean;
  @Input() public selectedItemId: string;

  @Output() public itemSelected: EventEmitter<string[]>;

  @ViewChild('autocomplete') autocomplete: ElementRef;

  public dropdownOpen: boolean;
  public filteredItems: AutoCompleteListType;
  public selectedItems: AutoCompleteListType;

  // The max number of items we show inside our autocomplete.
  public readonly MAX_SHOWN_ITEMS = 15;

  constructor() {
    this.itemSelected = new EventEmitter();
  }

  @HostListener('document:click', ['$event'])
  public clickout(event: Event) {
    if (this.autocomplete && !this.autocomplete.nativeElement.contains(event.target) && this.dropdownOpen) {
      this.dropdownOpen = false;
    }
  }

  public ngOnChanges(): void {
    this.filteredItems = this.items.slice(0, this.MAX_SHOWN_ITEMS);
    this.selectedItems = [];

    for (const item of this.items) {
      if (item.id === this.selectedItemId) {
        this.selectedItems.push(item);
      }
    }
  }

  /**
   * We have different types of things in our autocomplete, so make sure we know how to
   * get the name of each differing type.
   *
   * @param item The item that we need the name of
   * @returns The item's name
   */
  public getItemNameOrIdentifier(item: AutoCompleteType): string {
    if (item) {
      if ('label' in item) {
        // Handle state enumerations.
        return item.label;
      } else if ('name' in item) {
        // Handle command arguments.
        return item.name;
      } else if ('identifier' in item) {
        // Everything else has an identifier, so return that.
        return item.identifier;
      }
    }
  }

  // As the user types, filter down our items and only show up to the max.
  public onFilter(event: any): void {
    const filter = event.target.value.toLowerCase();

    this.filteredItems = this.items.filter(item => {
      if ('label' in item) {
        return item.label.toLowerCase().includes(filter);
      } else if ('name' in item) {
        return item.name.toLowerCase().includes(filter);
      } else if ('identifier' in item) {
        return item.identifier.toLowerCase().includes(filter);
      }
    }).slice(0, this.MAX_SHOWN_ITEMS);
  }

  onRemoveSelected(removedId: string): void {
    this.selectedItems = this.selectedItems.filter((item) => item.id !== removedId);
    this.itemSelected.emit(undefined);
  }

  public onSelectItem(item: AutoCompleteType): void {
    this.dropdownOpen = false;

    if (this.multiselect) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = [item];
    }

    this.itemSelected.emit(this.selectedItems.map((item) => item.id));
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
