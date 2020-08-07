import { Component, ChangeDetectionStrategy, NgModule, ViewChild, ElementRef, Input, OnChanges, EventEmitter, Output, HostListener } from '@angular/core';

import { MaterialModule } from 'src/app/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'collection-input',
  styleUrls: [ 'collection-input.component.css' ],
  templateUrl: 'collection-input.component.html'
})
export class CollectionInputComponent implements OnChanges {
  @Input() public focus: boolean;
  @Output() public collectionNameOutput: EventEmitter<string>;

  @ViewChild('collectionNameInput') collectionNameInput: ElementRef;

  private ignoreFirstClick: boolean;

  constructor(
    private elementRef: ElementRef
  ) {
    this.collectionNameOutput = new EventEmitter<string>();
  }

  // Listen for a click outside of the input, this triggers the close.
  @HostListener('document:click', ['$event'])
  public clickOutside(event: Event): void {
    // Skip the first click outside, it triggers too early.
    if (!this.elementRef.nativeElement.contains(event.target) && this.ignoreFirstClick) {
      this.collectionNameOutput.emit(this.collectionNameInput.nativeElement.value);
    }

    this.ignoreFirstClick = true;
  }

  public ngOnChanges(): void {
    if (this.focus) {
      setTimeout(() => {
        this.collectionNameInput.nativeElement.focus();
      });
    }
  }

  public onEnter(): void {
    this.collectionNameOutput.emit(this.collectionNameInput.nativeElement.value);
  }
}

@NgModule({
  declarations: [
    CollectionInputComponent
  ],
  exports: [
    CollectionInputComponent
  ],
  imports: [
    MaterialModule
  ]
})
export class CollectionInputModule {}
