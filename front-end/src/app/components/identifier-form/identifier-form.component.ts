import { NgModule, Component, ViewChild, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
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

  @ViewChild(MatTooltip, { static: false }) duplicateTooltip: MatTooltip;

  public currentIdentifier: string;
  public identifierIcon: string;
  public identifierTooltipText: string;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon('done', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/done.svg'));

    this.duplicateIdentifier = new EventEmitter<boolean>();
    this.identifierEmitter = new EventEmitter<string>();
  }

  public ngOnChanges(): void {
    this.currentIdentifier = this.originalIdentifier;

    this.onIdentifierChange(this.currentIdentifier);
  }

  /**
   * Called everytime the text for the identifier changes. Changes our icon, and also sets the tooltip
   * if the identifier isn't empty.
   *
   * @param identifier The current identifier.
   */
  public onIdentifierChange(identifier: string): void {
    /**
     * Keep track of the current identifier, so if the user changes the type
     * we check if it's a duplicate again.
     */
    this.currentIdentifier = identifier;

    if (this.identifierMap && Object.keys(this.identifierMap).length > 0) {
      if (this.isIdentifierDuplicate(identifier)) {
        this.identifierIcon = 'clear';
        this.identifierTooltipText = 'Your identifier is a duplicate';

        // Emit an error so the user can't save when there's a duplicate.
        this.duplicateIdentifier.emit(true);
      } else {
        this.identifierIcon = 'done';
        this.identifierTooltipText = 'Your identifier is unique';

        this.duplicateIdentifier.emit(false);
      }
    } else {
      // Reset everything when the user clears the field.
      this.identifierIcon = null;
      this.identifierTooltipText = null;
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
