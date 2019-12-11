import { Component, NgModule, Inject, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
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
  public identifiers: Map<string, boolean>;
  public title = '';
  public stateVariable: StateVariable;
  public isIdentifierUnique: boolean;
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

    if (this.data.stateVariable === undefined) {
      // On a create setup a new state variable.
      this.title = 'Create State';

      this.stateVariable = {
        id: undefined,
        identifier: '',
        name: '',
        type: '',
        units: '',
        source: '',
        description: ''
      };
    } else {
      // On an edit copy our existing state variable to be modified.
      this.title = 'Edit State';

      this.stateVariable = {
        ...this.data.stateVariable
      };

      // Keep track of our previous identifier so we can still save if it doesn't change.
      this.oldIdentifier = this.stateVariable.identifier;
    }

    this.form = new FormGroup({
      identifier: new FormControl(this.stateVariable.identifier, [ Validators.required ]),
      name: new FormControl(this.stateVariable.name, [ Validators.required ]),
      type: new FormControl(this.stateVariable.type, [ Validators.required ]),
      units: new FormControl(this.stateVariable.units, [ Validators.required ]),
      source: new FormControl(this.stateVariable.source, [ Validators.required ]),
      description: new FormControl(this.stateVariable.description),
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onSubmit(): void {
    // TODO: Add some saving logic.
    if (this.identifierIcon === 'clear') {
      this.dialogRef.close(this.stateVariable);
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  /**
   * Called everytime the text for the identifier changes. Changes our icon, and also sets the tooltip
   * if the identifier isn't empty.
   * Every identifier is unqiue so we need to check:
   * 1) That we have a unique identifier
   * 2) AND that we're not flagging an edited identifier on it's own value.
   * @param identifier The current identifier.
   */
  public onIdentifierChange(identifier: string): void {
    if (identifier.length > 0) {
      if (this.identifiers.get(identifier)
          && (!this.oldIdentifier || identifier !== this.oldIdentifier)) {
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
