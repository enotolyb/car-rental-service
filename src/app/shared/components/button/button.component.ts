import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() theme: 'green' | 'blue' | 'red' | 'purple' | 'dark-green' = 'green';
  @Input() size: 'landing' | 'slider' | 'order' = 'order';

  constructor() { }

  ngOnInit() {
  }

}
