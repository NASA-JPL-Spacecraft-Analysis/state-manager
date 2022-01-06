import { NgModule, Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material';
import { IdentifierMap } from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-identifier-form',
  styleUrls: [ 'identifier-form.component.css' ],
  templateUrl: 'identifier-form.component.html'
})
export class IdentifierFormComponent implements OnChanges {
  @Input() public originalIdentifier: string;
  @Input() public identifierMap: IdentifierMap;
  @Input() public id: string;
  @Input() public type: string;

  @Output() public duplicateIdentifier: EventEmitter<boolean>;
  @Output() public identifierEmitter: EventEmitter<string>;

  public currentIdentifier: string;
  public identifierIcon: string;
  public identifierTooltipText: string;
  public isDuplicateIdentifier: boolean;
  public showDuplicateIdentifierMessage: boolean;

  constructor() {
    this.duplicateIdentifier = new EventEmitter<boolean>();
    this.identifierEmitter = new EventEmitter<string>();
  }

  public ngOnChanges(): void {
    this.currentIdentifier = this.originalIdentifier;

    this.onIdentifierChange(this.currentIdentifier);
  }

  /**
   * Called everytime the text for the identifier changes.
   *
   * @param identifier The current identifier.
   */
  public onIdentifierChange(identifier: string): void {
    /**
     * Keep track of the current identifier, so if the user changes the type
     * we check if it's a duplicate again.
     */
    this.currentIdentifier = identifier;

    if (this.identifierMap && this.currentIdentifier && Object.keys(this.identifierMap).length > 0) {
      this.showDuplicateIdentifierMessage = true;

      if (this.isIdentifierDuplicate(identifier)) {
        this.isDuplicateIdentifier = true;

        // Emit an error so the user can't save when there's a duplicate.
        this.duplicateIdentifier.emit(this.isDuplicateIdentifier);
      } else {
        this.isDuplicateIdentifier = false;

        this.duplicateIdentifier.emit(this.isDuplicateIdentifier);
      }
    } else {
      this.showDuplicateIdentifierMessage = false;
    }

    this.identifierEmitter.emit(identifier);
  }

  /**
   * Checks to see if an identifier is duplicate by:
   * 1) That we have some identifiers
   * 2) That we have a unique identifier and type
   *
   * @param identifier The current identifier.
   */
  private isIdentifierDuplicate(identifier: string): boolean {
    const identifierList = this.identifierMap[identifier];

    if (identifierList) {
      for (const item of identifierList) {
        // Check each item that isn't the item we have open in the sidenav, and its type.
        if (item.id !== this.id && item.type === this.type) {
          return true;
        }
      }
    }

    return false;
  }
}

@NgModule({
  declarations: [
    IdentifierFormComponent
  ],
  exports: [
    IdentifierFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ]
})
export class IdentifierFormModule {}
