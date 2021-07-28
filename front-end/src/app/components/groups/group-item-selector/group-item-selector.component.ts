import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgModule, OnChanges, Output, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { MaterialModule } from 'src/app/material';
import { GroupItemType, GroupMapping } from 'src/app/models';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'group-item-selector',
  styleUrls: [ 'group-item-selector.component.css' ],
  templateUrl: 'group-item-selector.component.html'
})
export class GroupItemSelectorComponent implements OnChanges {
  @Input() public itemList: GroupItemType[];
  @Input() public selectedItems: GroupItemType[] | undefined;

  @Output() public selectionChange: EventEmitter<GroupItemType[]>;

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;

  public filteredItems: Observable<GroupItemType[]>;
  public formControl: FormControl;
  public separatorKeysCodes: number[] = [ COMMA, ENTER ];

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.selectionChange = new EventEmitter<GroupItemType[]>();

    this.iconRegistry.addSvgIcon('clear', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));
  }

  public ngOnChanges(): void {
    this.formControl = new FormControl();

    // Setup the filter to run whenever the input changes.
    this.filteredItems = this.formControl.valueChanges.pipe(
      startWith(undefined),
      map((filterValue: string | undefined) => {
        // Check the type of the filter, an actual GroupItemType gets here on selection.
        if (filterValue && typeof filterValue === 'string') {
          return this.filter(filterValue);
        }

        return this.itemList.slice();
      })
    );
  }

  public onRemove(item: GroupItemType): void {
    const index = this.selectedItems.indexOf(item);

    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }

    this.selectionChange.emit(this.selectedItems);
  }

  public onSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectedItems.push(event.option.value);
    this.itemInput.nativeElement.value = '';
    this.formControl.setValue(undefined);

    this.selectionChange.emit(this.selectedItems);
  }

  /*
   * Filter by checking to see if the item's identifier contains the filter text.
   *
   * @param filterValue The search text we're filtering by.
   * @returns A list of values whose identifiers contain the filter text.
   */
  private filter(filterValue: string): GroupItemType[] {
    filterValue = filterValue.toLowerCase();

    return this.itemList.filter(item => item.identifier.toLocaleLowerCase().includes(filterValue));
  }
}

@NgModule({
  declarations: [
    GroupItemSelectorComponent
  ],
  exports: [
    GroupItemSelectorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class GroupItemSelectorModule {}
