import { EventEmitter, Component, NgModule, ChangeDetectionStrategy, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { MaterialModule } from 'src/app/material';
import { Event } from 'src/app/models';
import { IdentifierFormModule } from '../identifier-form/identifier-form.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'event-sidenav',
  styleUrls: [ 'event-sidenav.component.css' ],
  templateUrl: 'event-sidenav.component.html'
})
export class EventSidenavComponent implements OnChanges {
  @Input() public event: Event;
  @Input() public eventIdentifierMap: Map<string, number>;
  @Input() public selectedCollectionId: number;

  @Output() public modifyEvent: EventEmitter<Event>;

  public form: FormGroup;
  public newEvent: Event;
  public originalIdentifier: string;

  private duplicateIdentifier: boolean;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon('clear', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/clear.svg'));

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
        editable: true
      };
    } else {
      this.newEvent = {
        ...this.event
      };

      this.originalIdentifier = this.newEvent.identifier;
    }

    this.form = new FormGroup({
      id: new FormControl(this.newEvent.id),
      collectionId: new FormControl(this.newEvent.collectionId),
      identifier: new FormControl(this.newEvent.identifier),
      displayName: new FormControl(this.newEvent.displayName),
      description: new FormControl(this.newEvent.description),
      externalLink: new FormControl(this.newEvent.externalLink)
    });
  }

  public onCancel(): void {
    this.modifyEvent.emit(undefined);
  }

  public onDuplicateIdentifier(duplicateIdentifier: boolean): void {
    this.duplicateIdentifier = duplicateIdentifier;
  }

  public onIdentifierChange(identifier: string): void {
    this.newEvent.identifier = identifier;
    this.form.get('identifier').setValue(identifier);
  }

  public onSubmit(): void {
    if (!this.duplicateIdentifier) {
      this.modifyEvent.emit(this.form.value);
    }
  }
}

@NgModule({
  declarations: [
    EventSidenavComponent
  ],
  exports: [
    EventSidenavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IdentifierFormModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class EventSidenavModule {}
