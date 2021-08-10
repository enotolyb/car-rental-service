import { Component } from '@angular/core';

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.scss'],
})
export class DetailsOrderComponent {
  text = 'Итого';

  theme = '';

  details = [
    { id: 1, name: 'Пункт выдачи', value: 'Ульяновск, Нариманова 42' },
    { id: 2, name: 'Модель', value: 'Hyndai, i30 N' },
    { id: 3, name: 'Цвет', value: 'Голубой' },
    { id: 4, name: 'Длительность аренды', value: '1д 2ч' },
    { id: 5, name: 'Тариф', value: 'На сутки' },
    { id: 6, name: 'Полный бак', value: 'Да' },
  ];
}
