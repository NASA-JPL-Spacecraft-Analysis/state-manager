import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Command, CommandArgument, IdentifierMap } from 'src/app/models';
import { CommandArgumentFormModule } from '../../command-argument-form/command-argument-form.component';
import { IdentifierFormModule } from '../../identifier-form/identifier-form.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'command-sidenav',
  styleUrls: [ 'command-sidenav.component.css' ],
  templateUrl: 'command-sidenav.component.html'
})
export class CommandSidenavComponent implements OnChanges {
  @Input() public collectionId: string;
  @Input() public command: Command;
  @Input() public commandArguments: CommandArgument[];
  @Input() public commandIdentifierMap: IdentifierMap;

  @Output() public errorEmitter: EventEmitter<string>;
  @Output() public modifyCommand: EventEmitter<{ command: Command; deletedArgumentIds: string[] }>;

  public deletedArgumentIds: string[];
  public form: FormGroup;
  public newCommand: Command;
  public originalIdentifier: string;
  public type: string;

  private isDuplicateIdentifier: boolean;

  constructor() {
    this.errorEmitter = new EventEmitter<string>();
    this.modifyCommand = new EventEmitter<{ command: Command; deletedArgumentIds: string[] }>();
  }

  public ngOnChanges(): void {
    if (!this.commandArguments) {
      this.commandArguments = [];
    }

    if (!this.command) {
      this.newCommand = {
        arguments: this.commandArguments,
        collectionId: this.collectionId,
        description: '',
        displayName: '',
        editable: true,
        externalLink: '',
        id: undefined,
        identifier: '',
        type: 'command'
      };
    } else {
      this.newCommand = {
        ...this.command,
        arguments: [
          ...this.commandArguments.map(argument => ({ ...argument }))
        ]
      };
    }

    this.type = this.newCommand.type;
    this.originalIdentifier = this.newCommand.identifier;
    this.deletedArgumentIds = [];

    this.form = new FormGroup({
      collectionId: new FormControl(this.newCommand.collectionId),
      description: new FormControl(this.newCommand.description),
      displayName: new FormControl(this.newCommand.displayName),
      editable: new FormControl(this.newCommand.editable),
      externalLink: new FormControl(this.newCommand.externalLink),
      id: new FormControl(this.newCommand.id),
      identifier: new FormControl(this.newCommand.identifier),
      type: new FormControl(this.type, [ Validators.required ])
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
    if (this.processArguments()) {
      if (!this.isDuplicateIdentifier) {
        this.modifyCommand.emit({
          command: {
            ...this.form.value,
            arguments: this.newCommand.arguments
          },
          deletedArgumentIds: this.deletedArgumentIds
        });
      } else {
        this.errorEmitter.emit('Please provide a unique identifier');
      }
    } else {
      this.errorEmitter.emit('Please provide a name for each argument');
    }
  }

  // Make sure that each argument has a required name.
  private processArguments(): boolean {
    for (const argument of this.newCommand.arguments) {
      if (!argument.name) {
        return false;
      }
    }

    return true;
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
    CommandArgumentFormModule,
    CommonModule,
    FormsModule,
    IdentifierFormModule,
    ReactiveFormsModule
  ]
})
export class CommandSidenavModule {}
