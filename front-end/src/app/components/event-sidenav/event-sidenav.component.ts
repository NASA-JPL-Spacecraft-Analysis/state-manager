import { EventEmitter, Component, NgModule, ChangeDetectionStrategy, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { MaterialModule } from 'src/app/material';
import { Event } from 'src/app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'event-sidenav',
  styleUrls: [ 'event-sidenav.component.css' ],
  templateUrl: 'event-sidenav.component.html'
})
export class EventSidenavComponent implements OnChanges {
  @Input() public event: Event;

  @Output() public modifyEvent: EventEmitter<Event>;

  public form: FormGroup;
  public newEvent: Event;

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
    }

    this.form = new FormGroup({
      id: new FormControl(this.newEvent.id),
      identifier: new FormControl(this.newEvent.identifier),
      displayName: new FormControl(this.newEvent.displayName),
      description: new FormControl(this.newEvent.description),
      externalLink: new FormControl(this.newEvent.externalLink)
    });
  }

  public onCancel(): void {
    this.modifyEvent.emit(undefined);
  }

  public onSubmit(): void {
    this.modifyEvent.emit(this.form.value);
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
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class EventSidenavModule {}
