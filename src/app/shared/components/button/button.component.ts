import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() theme: 'green' | 'blue' | 'red' | 'purple' | 'dark-green' = 'green';

  @Input() size: 'landing' | 'slider' | 'order' = 'order';
}
