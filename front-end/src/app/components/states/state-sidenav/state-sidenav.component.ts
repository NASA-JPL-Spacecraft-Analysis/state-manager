import { Component, NgModule, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';

import { stateTypes, IdentifierMap, State, StateEnumeration } from '../../../models';
import { MaterialModule } from 'src/app/material';
import { EnumFormModule } from '../../enum-form/enum-form.component';
import { IdentifierFormModule } from '../../identifier-form/identifier-form.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-state-sidenav',
  styleUrls: [ 'state-sidenav.component.css' ],
  templateUrl: 'state-sidenav.component.html'
})
export class StateSidenavComponent implements OnChanges {
  @Input() public collectionId: string;
  @Input() public state: State;
  @Input() public stateEnumerations: StateEnumeration[];
  @Input() public stateIdentifierMap: IdentifierMap;

  @Output() public errorEmitter: EventEmitter<string>;
  @Output() public modifyState: EventEmitter<{ state: State; deletedEnumerationIds: string[] }>;

  public deletedEnumerationIds: string[];
  public form: FormGroup;
  public newState: State;
  public originalIdentifier: string;
  public stateTypes = stateTypes;

  private duplicateIdentifier: boolean;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
  ) {
    this.iconRegistry.addSvgIcon('clear', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));

    this.errorEmitter = new EventEmitter<string>();
    this.modifyState = new EventEmitter<{ state: State; deletedEnumerationIds: string[] }>();
  }

  public ngOnChanges(): void {
    if (this.state === undefined) {
      this.newState = {
        collectionId: this.collectionId,
        dataType: '',
        description: '',
        displayName: '',
        editable: true,
        enumerations: this.stateEnumerations,
        externalLink: '',
        id: undefined,
        identifier: '',
        source: '',
        subsystem: '',
        type: '',
        units: ''
      };
    } else {
      this.newState = {
        ...this.state,
        enumerations: [
          ...this.stateEnumerations.map(enumeration => { return { ...enumeration }})
        ]
      };
    }

    this.originalIdentifier = this.newState.identifier;
    this.deletedEnumerationIds = [];

    this.form = new FormGroup({
      collectionId: new FormControl(this.newState.collectionId),
      dataType: new FormControl(this.newState.dataType),
      displayName: new FormControl(this.newState.displayName, [ Validators.required ]),
      description: new FormControl(this.newState.description),
      externalLink: new FormControl(this.newState.externalLink),
      id: new FormControl(this.newState.id),
      identifier: new FormControl(this.newState.identifier, [ Validators.required ]),
      source: new FormControl(this.newState.source, [ Validators.required ]),
      subsystem: new FormControl(this.newState.subsystem, [ Validators.required ]),
      type: new FormControl(this.newState.type, [ Validators.required ]),
      units: new FormControl(this.newState.units, [ Validators.required ]),
    });
  }

  public onCancel(): void {
    this.modifyState.emit(undefined);
  }

  public onDuplicateIdentifier(duplicateIdentifier: boolean): void {
    this.duplicateIdentifier = duplicateIdentifier;
  }

  public onIdentifierChange(identifier: string): void {
    this.newState.identifier = identifier;
    this.form.get('identifier').setValue(identifier);
  }

  /**
   * Called when the user submits the form.
   * When the user submits, we check:
   * 1) That our identifier is unique (when trimmed)
   */
  public onSubmit(): void {
    // Process our enumerations and make sure the form is valid before trying to save our state.
    if (this.processEnumerations()) {
      if (!this.duplicateIdentifier) {
        this.modifyState.emit({
          state: {
            ...this.form.value,
            enumerations: this.newState.enumerations
          },
          deletedEnumerationIds: this.deletedEnumerationIds
        });
      } else {
        this.errorEmitter.emit('Please provide a unique identifier');
      }
    } else {
      this.errorEmitter.emit('Please provide a value and label for all enumerations');
    }
  }

  /**
   * Checks to see if the enumerations were modified. If they were, then we save them.
   */
  private processEnumerations(): boolean {
    // Check and make sure values are set for all our enumerations.
    for (const enumeration of this.newState.enumerations) {
      if (!enumeration.label || !enumeration.value) {
        return false;
      }
    }

    return true;
  }
}

@NgModule({
  declarations: [
    StateSidenavComponent
  ],
  exports: [
    StateSidenavComponent
  ],
  imports: [
    EnumFormModule,
    IdentifierFormModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class StateSidenavModule {}
