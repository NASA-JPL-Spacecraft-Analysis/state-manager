import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'badge',
  styleUrls: ['badge.css'],
  templateUrl: 'badge.html'
})
export class Badge implements OnInit {
  @Input() public text: string;
  public ngOnInit(): void {}
}
