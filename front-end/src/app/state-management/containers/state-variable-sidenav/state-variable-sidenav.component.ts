import { Component, NgModule, ChangeDetectionStrategy, Input,
  ChangeDetectorRef, OnDestroy, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule, MatTooltip } from '@angular/material/tooltip';
import { SubSink } from 'subsink';

import { StateVariable } from '../../models';
import { StateManagementAppState } from '../../state-management-app-store';
import { getIdentifiers } from '../../selectors';
import { StateVariableActions } from '../../actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'state-variable-sidenav',
  styleUrls: [ 'state-variable-sidenav.component.css' ],
  templateUrl: 'state-variable-sidenav.component.html'
})
export class StateVariableSidenavComponent implements OnChanges, OnDestroy {
  @Input() public stateVariable: StateVariable;

  @Output() public modifyStateVariable: EventEmitter<StateVariable>;

  @ViewChild(MatTooltip, { static: false }) duplicateTooltip: MatTooltip;

  public newStateVariable: StateVariable;
  public identifierIcon: string;
  public tooltip: string;
  public form: FormGroup;
  public identifiers: Set<string>;

  private subscriptions = new SubSink();

  constructor(
    private store: Store<StateManagementAppState>,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.iconRegistry.addSvgIcon('done', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/done.svg'));
    this.iconRegistry.addSvgIcon('clear', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));

    this.modifyStateVariable = new EventEmitter<StateVariable>();

    this.store.dispatch(StateVariableActions.fetchIdentifiers({}));

    this.subscriptions.add(
      this.store.pipe(select(getIdentifiers)).subscribe(identifiers => {
        this.identifiers = identifiers;
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
      description: new FormControl(this.newStateVariable.description),
    });
  }

  /**
   * Called when the user submits the form.
   * When the user submits, we check:
   * 1) That our identifier is unique (when trimmed)
   */
  public onSubmit(): void {
    if (!this.isIdentifierDuplicate(this.form.value.identifier.trim())) {
      this.modifyStateVariable.emit(this.form.value);
    } else {
      // Show the duplicate tooltip.
      this.duplicateTooltip.show();
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
        this.tooltip = 'Your identifier is a duplicate';

        // Mark our form as invalid so the user can't save when there's a duplicate.
        this.form.get('identifier').setErrors({});
      } else {
        this.identifierIcon = 'done';
        this.tooltip = 'Your identifier is unique';
      }
    } else {
      // Reset everything when the user clears the field.
      this.identifierIcon = null;
      this.tooltip = null;
    }
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
          && (!this.stateVariable.identifier || identifier !== this.stateVariable.identifier);
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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule
  ]
})
export class StateVariableSidenavModule {}
