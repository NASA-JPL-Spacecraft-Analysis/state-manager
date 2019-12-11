import { Component, NgModule, Inject, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
      this.title = 'Edit State';

      this.stateVariable = {
        ...this.data.stateVariable
      };

      // Keep track of our previous identifier so we can still save if it doesn't change.
      this.oldIdentifier = this.stateVariable.identifier;
    }
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onSave(): void {
    // Add some saving logic.
    this.dialogRef.close(this.stateVariable);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onIdentifierChange(identifier: string): void {
    if (this.identifiers.get(identifier)
        && this.stateVariable.identifier !== this.oldIdentifier) {
      this.identifierIcon = 'clear';
    } else {
      this.identifierIcon = 'done';
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
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ]
})
export class DataDialogModule {}
