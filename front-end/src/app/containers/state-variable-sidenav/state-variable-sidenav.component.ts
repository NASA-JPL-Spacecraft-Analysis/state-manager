import { Component, NgModule, ChangeDetectionStrategy, Input,
  ChangeDetectorRef, OnDestroy, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { SubSink } from 'subsink';

import { StateVariable, StateEnumeration } from '../../models';
import { getIdentifiers, getStateEnumerationsForSelectedStateVariable } from '../../selectors';
import { ToastActions } from '../../actions';
import { EnumFormModule } from '../../components';
import { AppState } from 'src/app/app-store';
import { MaterialModule } from 'src/app/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'state-variable-sidenav',
  styleUrls: [ 'state-variable-sidenav.component.css' ],
  templateUrl: 'state-variable-sidenav.component.html'
})
export class StateVariableSidenavComponent implements OnChanges, OnDestroy {
  @Input() public stateVariable: StateVariable;

  @Output() public modifyStateVariable: EventEmitter<{ stateVariable: StateVariable, stateEnumerations: StateEnumeration[] }>;
  @Output() public modifyEnumerations: EventEmitter<StateEnumeration[]>;

  @ViewChild(MatTooltip, { static: false }) duplicateTooltip: MatTooltip;

  public newStateVariable: StateVariable;
  public enumerations: StateEnumeration[];
  public identifierIcon: string;
  public identifierTooltipText: string;
  public form: FormGroup;
  public identifiers: Set<string>;

  private subscriptions = new SubSink();

  constructor(
    private store: Store<AppState>,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.iconRegistry.addSvgIcon('done', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/done.svg'));
    this.iconRegistry.addSvgIcon('clear', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));

    this.modifyStateVariable = new EventEmitter<{ stateVariable: StateVariable, stateEnumerations: StateEnumeration[] }>();
    this.modifyEnumerations = new EventEmitter<StateEnumeration[]>();

    this.subscriptions.add(
      this.store.pipe(select(getIdentifiers)).subscribe(identifiers => {
        this.identifiers = identifiers;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getStateEnumerationsForSelectedStateVariable)).subscribe(enumerations => {
        this.enumerations = enumerations;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public ngOnChanges(): void {
    if (this.stateVariable === undefined) {
      this.newStateVariable = {
        id: undefined,
        identifier: '',
        displayName: '',
        type: '',
        units: '',
        source: '',
        subsystem: '',
        description: ''
      };
    } else {
      this.newStateVariable = {
        ...this.stateVariable
      };
    }

    this.form = new FormGroup({
      id: new FormControl(this.newStateVariable.id),
      identifier: new FormControl(this.newStateVariable.identifier, [ Validators.required ]),
      displayName: new FormControl(this.newStateVariable.displayName, [ Validators.required ]),
      type: new FormControl(this.newStateVariable.type, [ Validators.required ]),
      units: new FormControl(this.newStateVariable.units, [ Validators.required ]),
      source: new FormControl(this.newStateVariable.source, [ Validators.required ]),
      subsystem: new FormControl(this.newStateVariable.subsystem, [ Validators.required ]),
      description: new FormControl(this.newStateVariable.description)
    });
  }

  /**
   * Called when the user submits the form.
   * When the user submits, we check:
   * 1) That our identifier is unique (when trimmed)
   */
  public onSubmit(): void {
    // Process our enumerations before trying to save our state variable.
    if (this.processEnumerations()) {
      if (!this.isIdentifierDuplicate(this.form.value.identifier.trim())) {
        // Emit both values, but we'll only use the enumeraion list on creating a new state variable.
        this.modifyStateVariable.emit({
          stateVariable: this.form.value,
          stateEnumerations: this.enumerations
        });
      } else {
        // Show the duplicate tooltip.
        this.duplicateTooltip.show();
      }
    } else {
      // If we had an issue with the enumerations, show an error.
      this.store.dispatch(
        ToastActions.showToast({
          message: 'Please provide a value and label for all enumerations',
          toastType: 'error'
        })
      );
    }
  }

  public onCancel(): void {
    this.modifyStateVariable.emit(undefined);
  }

  /**
   * Called everytime the text for the identifier changes. Changes our icon, and also sets the tooltip
   * if the identifier isn't empty.
   * @param identifier The current identifier.
   */
  public onIdentifierChange(identifier: string): void {
    if (identifier.length > 0) {
      if (this.isIdentifierDuplicate(identifier)) {
        this.identifierIcon = 'clear';
        this.identifierTooltipText = 'Your identifier is a duplicate';

        // Mark our form as invalid so the user can't save when there's a duplicate.
        this.form.get('identifier').setErrors({});
      } else {
        this.identifierIcon = 'done';
        this.identifierTooltipText = 'Your identifier is unique';
      }
    } else {
      // Reset everything when the user clears the field.
      this.identifierIcon = null;
      this.identifierTooltipText = null;
    }
  }

  /**
   * Checks to see if the enumerations were modified. If they were, then we save them.
   */
  private processEnumerations(): boolean {
    // Check and make sure values are set for all our enumerations.
    for (const enumeration of this.enumerations) {
      if (enumeration.label === null || enumeration.value === null) {
        return false;
      }
    }

    // Only emit our enumerations seperatly if we're modifying an existing state variable.
    if (this.newStateVariable.id !== undefined) {
      this.modifyEnumerations.emit(this.enumerations);
    }

    return true;
  }

  /**
   * Checks to see if an identifier is duplicate by:
   * 1) That we have some identifiers then
   * 2) That we have a unique identifier
   * 3) AND that we're not flagging an edited identifier on it's own value
   * @param identifier The current identifier.
   */
  private isIdentifierDuplicate(identifier: string): boolean {
    if (this.identifiers.size > 0) {
      return this.identifiers.has(identifier)
          && (!this.newStateVariable.identifier || identifier !== this.newStateVariable.identifier);
    }

    return false;
  }
}

@NgModule({
  declarations: [
    StateVariableSidenavComponent
  ],
  exports: [
    StateVariableSidenavComponent
  ],
  imports: [
    EnumFormModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class StateVariableSidenavModule {}
