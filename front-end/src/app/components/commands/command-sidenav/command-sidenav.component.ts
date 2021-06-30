import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { MaterialModule } from 'src/app/material';
import { Command, commandTypes, IdentifierMap } from 'src/app/models';
import { IdentifierFormModule } from '../../identifier-form/identifier-form.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'command-sidenav',
  styleUrls: [ 'command-sidenav.component.css' ],
  templateUrl: 'command-sidenav.component.html'
})
export class CommandSidenavComponent implements OnChanges {
  @Input() public command: Command;
  @Input() public commandIdentifierMap: IdentifierMap;

  @Output() public duplicateIdentifier: EventEmitter<boolean>;
  @Output() public modifyCommand: EventEmitter<Command>;

  public commandTypes = commandTypes;
  public form: FormGroup;
  public newCommand: Command;
  public originalIdentifier: string;
  public selectedType: string;

  private isDuplicateIdentifier: boolean;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon('clear', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));

    this.duplicateIdentifier = new EventEmitter<boolean>();
    this.modifyCommand = new EventEmitter<Command>();
  }

  public ngOnChanges(): void {
    if (!this.command) {
      this.newCommand = {
        arguments: undefined,
        collectionId: undefined,
        description: '',
        displayName: '',
        editable: true,
        externalLink: '',
        id: undefined,
        identifier: '',
        type: ''
      };
    } else {
      this.newCommand= {
        ...this.command
      };
    }

    this.originalIdentifier = this.newCommand.identifier;
    this.selectedType = this.newCommand.type;

    this.form = new FormGroup({
      collectionId: new FormControl(this.newCommand.collectionId),
      description: new FormControl(this.newCommand.description),
      displayName: new FormControl(this.newCommand.displayName),
      editable: new FormControl(this.newCommand.editable),
      externalLink: new FormControl(this.newCommand.externalLink),
      id: new FormControl(this.newCommand.id),
      identifier: new FormControl(this.newCommand.identifier),
      type: new FormControl(this.selectedType, [ Validators.required ])
    });
  }

  public onCancel(): void {
    this.modifyCommand.emit(undefined);
  }

  public onDuplicateIdentifier(duplicateIdentifier: boolean): void {
    this.isDuplicateIdentifier = duplicateIdentifier;
  }

  public onIdentifierChange(identifier: string): void {
    this.newCommand.identifier = identifier;
    this.form.get('identifier').setValue(identifier);
  }

  public onSubmit(): void {
    if (!this.isDuplicateIdentifier) {
      this.form.value.type = this.selectedType;

      this.modifyCommand.emit(this.form.value);
    } else {
      this.duplicateIdentifier.emit(true);
    }
  }
}

@NgModule({
  declarations: [
    CommandSidenavComponent
  ],
  exports: [
    CommandSidenavComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    IdentifierFormModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CommandSidenavModule {}
