import { Component, Input } from '@angular/core';
import { MarkerPoint } from '../../../models/marker-point';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @Input() mapCenter: MarkerPoint;

  @Input() points: MarkerPoint[];
}
