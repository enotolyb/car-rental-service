import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Observable } from 'rxjs';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.scss'],
})
export class DetailsOrderComponent {
  order$: Observable<Order> = this.orderService.order$;

  theme = '';

  details = [
    { id: 1, name: 'Пункт выдачи', value: 'Ульяновск, Нариманова 42' },
    { id: 2, name: 'Модель', value: 'Hyndai, i30 N' },
    { id: 3, name: 'Цвет', value: 'Голубой' },
    { id: 4, name: 'Длительность аренды', value: '1д 2ч' },
    { id: 5, name: 'Тариф', value: 'На сутки' },
    { id: 6, name: 'Полный бак', value: 'Да' },
  ];

  constructor(private orderService: OrderService){
  }

  get activeStep(): number {
    return this.orderService.activeStep;
  }

  goToNextStep() {
    this.orderService.goToNextStep()
  }

  titleButton(): string {
    switch (this.activeStep) {
      case 1:
        return 'Выбрать модель';
      case 2:
        return 'Дополнительно';
      case 3:
        return 'Итого';
      case 4:
        return 'Заказать';
    }
  }
}
