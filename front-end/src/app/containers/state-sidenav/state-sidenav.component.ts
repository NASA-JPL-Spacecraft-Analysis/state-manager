import { Component, NgModule, ChangeDetectionStrategy, Input,
  ChangeDetectorRef, OnDestroy, Output, EventEmitter, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { MatIconRegistry } from '@angular/material/icon';
import { SubSink } from 'subsink';

import { State, StateEnumeration } from '../../models';
import { getStateIdentifiers, getStateEnumerationsForSelectedState } from '../../selectors';
import { ToastActions } from '../../actions';
import { EnumFormModule, IdentifierFormModule } from '../../components';
import { AppState } from 'src/app/app-store';
import { MaterialModule } from 'src/app/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'state-sidenav',
  styleUrls: [ 'state-sidenav.component.css' ],
  templateUrl: 'state-sidenav.component.html'
})
export class StateSidenavComponent implements OnChanges, OnDestroy {
  @Input() public state: State;

  @Output() public modifyState: EventEmitter<{ state: State, stateEnumerations: StateEnumeration[] }>;
  @Output() public modifyEnumerations: EventEmitter<StateEnumeration[]>;

  public newState: State;
  public originalIdentifier: string;
  public enumerations: StateEnumeration[];
  public form: FormGroup;
  public stateIdentifiers: Set<string>;

  private duplicateIdentifier: boolean;
  private subscriptions = new SubSink();

  constructor(
    private store: Store<AppState>,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.iconRegistry.addSvgIcon('clear', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));

    this.modifyState = new EventEmitter<{ state: State, stateEnumerations: StateEnumeration[] }>();
    this.modifyEnumerations = new EventEmitter<StateEnumeration[]>();

    this.subscriptions.add(
      this.store.pipe(select(getStateIdentifiers)).subscribe(stateIdentifiers => {
        this.stateIdentifiers = stateIdentifiers;
        this.changeDetectorRef.markForCheck();
      }),
      this.store.pipe(select(getStateEnumerationsForSelectedState)).subscribe(enumerations => {
        this.enumerations = enumerations;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public ngOnChanges(): void {
    if (this.state === undefined) {
      this.newState = {
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
      this.newState = {
        ...this.state
      };

      this.originalIdentifier = this.newState.identifier;
    }

    this.form = new FormGroup({
      id: new FormControl(this.newState.id),
      identifier: new FormControl(this.newState.identifier, [ Validators.required ]),
      displayName: new FormControl(this.newState.displayName, [ Validators.required ]),
      type: new FormControl(this.newState.type, [ Validators.required ]),
      units: new FormControl(this.newState.units, [ Validators.required ]),
      source: new FormControl(this.newState.source, [ Validators.required ]),
      subsystem: new FormControl(this.newState.subsystem, [ Validators.required ]),
      description: new FormControl(this.newState.description)
    });
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
    // Process our enumerations before trying to save our state.
    if (this.processEnumerations()) {
      if (!this.duplicateIdentifier) {
        // Only emit our enumerations seperatly if we're modifying an existing state.
        if (this.newState.id !== undefined) {
          this.modifyEnumerations.emit(this.enumerations);
        }

        // Emit both values, but we'll only use the enumeraion list on creating a new state.
        this.modifyState.emit({
          state: this.form.value,
          stateEnumerations: this.enumerations
        });
      } else {
        // Show the duplicate tooltip.
        this.store.dispatch(
          ToastActions.showToast({
            message: 'Please provide a unique identifier',
            toastType: 'error'
          })
        );
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
    this.modifyState.emit(undefined);
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
