import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, OnChanges } from '@angular/core';

import { CommandArgument, CommandArgumentType } from '../../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-command-argument-display',
  styleUrls: ['command-argument-display.component.css'],
  templateUrl: 'command-argument-display.component.html'
})
export class CommandArgumentDisplayComponent implements OnChanges {
  @Input() public arguments: CommandArgument[];

  public readonly CommandArgumentType = CommandArgumentType;

  public showArguments: boolean;

  public ngOnChanges(): void {
    this.arguments = [...this.arguments];
    this.arguments = this.arguments.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  public onExpandArguments(): void {
    this.showArguments = !this.showArguments;
  }

  public splitEnums(enumString: string): string[] {
    return enumString.split(',');
  }

  public removeTrailingComma(enumVal: string): string {
    return enumVal.substring(0, enumVal.length - 1);
  }
}

@NgModule({
  declarations: [
    CommandArgumentDisplayComponent
  ],
  exports: [
    CommandArgumentDisplayComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommandArgumentDisplayModule { }
