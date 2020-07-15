import { NgModule, Component, ViewChild, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { MaterialModule } from 'src/app/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'identifier-form',
  styleUrls: [ 'identifier-form.component.css' ],
  templateUrl: 'identifier-form.component.html'
})
export class IdentifierFormComponent {
  @Input() public originalIdentifier: string;
  @Input() public identifierMap: Map<string, number>;

  @Output() public duplicateIdentifier: EventEmitter<boolean>;
  @Output() public identifierEmitter: EventEmitter<string>;

  @ViewChild(MatTooltip, { static: false }) duplicateTooltip: MatTooltip;

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

  /**
   * Called everytime the text for the identifier changes. Changes our icon, and also sets the tooltip
   * if the identifier isn't empty.
   * @param identifier The current identifier.
   */
  public onIdentifierChange(identifier: string): void {
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
   * 2) That we have a unique identifier
   * 3) AND that we're not flagging an edited identifier on it's own value
   * @param identifier The current identifier.
   */
  private isIdentifierDuplicate(identifier: string): boolean {
    if (this.identifierMap && Object.keys(this.identifierMap).length > 0) {
      return this.identifierMap[identifier]
        && (!this.originalIdentifier || identifier !== this.originalIdentifier);
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
