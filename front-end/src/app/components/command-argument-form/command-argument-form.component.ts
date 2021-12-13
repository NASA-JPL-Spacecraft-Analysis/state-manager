import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material';
import { CommandArgument } from 'src/app/models';

/**
 * TODO: This component is going to dramatically change. Right not it's basically copied code
 * from the enum-form because command arguments aren't fully developed. Soon they'll have more
 * properties and we can remove all this duplicated code.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-command-argument-form',
  styleUrls: [ 'command-argument-form.component.css' ],
  templateUrl: 'command-argument-form.component.html'
})
export class CommandArgumentFormComponent implements OnChanges {
  @Input() arguments: CommandArgument[];
  @Input() collectionId: string;
  @Input() deletedArgumentIds: string[];

  public argumentLabel: string;

  public ngOnChanges(): void {
    this.updateArgumentsLabel();
  }

  // Add a new blank command argument.
  public onAddArgument(): void {
    this.arguments.push({
      collectionId: this.collectionId,
      commandId: undefined,
      id: undefined,
      name: '',
      sortOrder: undefined
    });

    this.updateArgumentsLabel();
  }

  // Remove the deleted command argument and then emit the current list of command arguments.
  public onDeleteArgument(argument: CommandArgument): void {
    this.arguments.splice(this.arguments.indexOf(argument), 1);

    // Only try and save the id of argument that have an id.
    if (argument.id) {
      this.deletedArgumentIds.push(argument.id);
    }

    this.updateArgumentsLabel();
  }

  private updateArgumentsLabel(): void {
    this.argumentLabel = this.arguments.length + ' Argument';

    if (this.arguments.length !== 1) {
      this.argumentLabel += 's';
    }
  }
}

@NgModule({
  declarations: [
    CommandArgumentFormComponent,
  ],
  exports: [
    CommandArgumentFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ]
})
export class CommandArgumentFormModule {}
