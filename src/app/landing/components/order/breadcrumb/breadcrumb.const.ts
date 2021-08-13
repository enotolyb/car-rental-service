import { OrderStep } from '../../../models/order';

export const breadcrumbs = [
  {
    title: 'Местоположение',
    step: OrderStep.location,
  },
  {
    title: 'Модель',
    step: OrderStep.model,
  },
  {
    title: 'Дополнительно',
    step: OrderStep.option,
  },
  {
    title: 'Итого',
    step: OrderStep.summary,
  },
];
