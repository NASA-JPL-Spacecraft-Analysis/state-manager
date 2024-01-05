import { Component, NgModule, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sm-menu',
  styleUrls: ['menu.component.css'],
  templateUrl: 'menu.component.html'
})
export class MenuComponent {
  public showMenu: boolean;

  private target: EventTarget;

  @HostListener('document:click', ['$event'])
  public clickOutside(event: Event) {
    if (this.showMenu && event.target !== this.target) {
      this.showMenu = false;
    }
  }

  public onMenuClick(event: Event) {
    this.showMenu = !this.showMenu;
    this.target = event.target;
  }
}

@NgModule({
  declarations: [MenuComponent],
  exports: [MenuComponent],
  imports: [CommonModule]
})
export class MenuModule {}
