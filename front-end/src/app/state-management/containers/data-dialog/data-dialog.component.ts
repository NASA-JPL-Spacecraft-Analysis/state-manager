import { Component, NgModule, Inject, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule, MatTooltip } from '@angular/material/tooltip';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { StateVariable } from '../../models';
import { getIdentifiers } from '../../selectors';
import { StateManagementAppState } from '../../state-management-app-store';
import { StateVariableActions } from '../../actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'data-dialog',
  templateUrl: 'data-dialog.component.html',
  styleUrls: [ 'data-dialog.component.css' ]
})
export class DataDialogComponent implements OnDestroy, OnInit {
  @ViewChild(MatTooltip, { static: false }) duplicateTooltip: MatTooltip;

  public identifiers: Map<string, boolean>;
  public title = '';
  public oldIdentifier: string;
  public identifierIcon: string;
  public form: FormGroup;
  public tooltip: string;

  private ngUnsubscribe: Subject<{}> = new Subject();

  constructor(
    public dialogRef: MatDialogRef<DataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { stateVariable: StateVariable },
    private store: Store<StateManagementAppState>,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
  ) {
    this.iconRegistry.addSvgIcon('done', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/done.svg'));
    this.iconRegistry.addSvgIcon('clear', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));
  }

  public ngOnInit(): void {
    this.store.dispatch(StateVariableActions.fetchIdentifiers({}));

    this.store.pipe(
      select(getIdentifiers),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (identifiers: Map<string, boolean>) => {
        this.identifiers = identifiers;
      }
    );

    let stateVariable: StateVariable;

    if (this.data.stateVariable === undefined) {
      // On a create setup a new state variable.
      this.title = 'Create State';

      stateVariable = {
        id: undefined,
        identifier: '',
        displayName: '',
        type: '',
        units: '',
        source: '',
        description: ''
      };
    } else {
      // On an edit copy our existing state variable to be modified.
      this.title = 'Edit State';

      stateVariable = {
        ...this.data.stateVariable
      };

      // Keep track of our previous identifier so we can still save if it doesn't change.
      this.oldIdentifier = stateVariable.identifier;
    }

    this.form = new FormGroup({
      id: new FormControl(stateVariable.id),
      identifier: new FormControl(stateVariable.identifier, [ Validators.required ]),
      displayName: new FormControl(stateVariable.displayName, [ Validators.required ]),
      type: new FormControl(stateVariable.type, [ Validators.required ]),
      units: new FormControl(stateVariable.units, [ Validators.required ]),
      source: new FormControl(stateVariable.source, [ Validators.required ]),
      description: new FormControl(stateVariable.description),
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /**
   * Called when the user submits the form.
   * When the user submits, we check:
   * 1) That our identifier is unique (when trimmed)
   */
  public onSubmit(): void {
    if (!this.isIdentifierDuplicate(this.form.value.identifier.trim())) {
      this.dialogRef.close(this.form.value);
    } else {
      // Show the duplicate tooltip.
      this.duplicateTooltip.show();
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
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
      return this.identifiers.get(identifier)
          && (!this.oldIdentifier || identifier !== this.oldIdentifier);
    }

    return false;
  }
}

@NgModule({
  declarations: [
    DataDialogComponent
  ],
  exports: [
    DataDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule
  ]
})
export class DataDialogModule {}
