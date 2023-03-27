import {
  EventEmitter,
  Component,
  NgModule,
  ChangeDetectionStrategy,
  Input,
  Output,
  OnChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MaterialModule } from 'src/app/material';
import { Event, IdentifierMap } from 'src/app/models';
import { IdentifierFormModule } from '../identifier-form/identifier-form.component';
import { LoadingModule } from '../loading/loading.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-event-sidenav',
  styleUrls: ['event-sidenav.component.css'],
  templateUrl: 'event-sidenav.component.html'
})
export class EventSidenavComponent implements OnChanges {
  @Input() public event: Event;
  @Input() public eventIdentifierMap: IdentifierMap;
  @Input() public eventTypes: string[];
  @Input() public isSaving: boolean;
  @Input() public selectedCollectionId: string;

  @Output() public duplicateIdentifier: EventEmitter<boolean>;
  @Output() public modifyEvent: EventEmitter<Event>;

  public form: FormGroup;
  public newEvent: Event;

  private isDuplicateIdentifier: boolean;

  constructor() {
    this.duplicateIdentifier = new EventEmitter<boolean>();
    this.modifyEvent = new EventEmitter<Event>();
  }

  public ngOnChanges(): void {
    if (this.event === undefined) {
      this.newEvent = {
        id: undefined,
        collectionId: this.selectedCollectionId,
        identifier: '',
        displayName: '',
        description: '',
        externalLink: '',
        editable: true,
        type: '',
        version: ''
      };
    } else {
      this.newEvent = {
        ...this.event
      };
    }

    this.form = new FormGroup({
      id: new FormControl(this.newEvent.id),
      collectionId: new FormControl(this.newEvent.collectionId),
      identifier: new FormControl(this.newEvent.identifier, [Validators.required]),
      displayName: new FormControl(this.newEvent.displayName, [Validators.required]),
      description: new FormControl(this.newEvent.description),
      externalLink: new FormControl(this.newEvent.externalLink),
      type: new FormControl(this.newEvent.type, [Validators.required]),
      version: new FormControl(this.newEvent.version)
    });
  }

  public onCancel(): void {
    this.modifyEvent.emit(undefined);
  }

  public onDuplicateIdentifier(duplicateIdentifier: boolean): void {
    this.isDuplicateIdentifier = duplicateIdentifier;
  }

  public onIdentifierChange(identifier: string): void {
    this.newEvent.identifier = identifier;
    this.form.get('identifier').setValue(identifier);
  }

  public onSubmit(): void {
    if (!this.isDuplicateIdentifier) {
      this.modifyEvent.emit(this.form.value);
    } else {
      this.duplicateIdentifier.emit(true);
    }
  }
}

@NgModule({
  declarations: [EventSidenavComponent],
  exports: [EventSidenavComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoadingModule,
    IdentifierFormModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class EventSidenavModule {}
