import { City } from './city';
import { Point } from './point';
import { Car } from './car';
import { Tariff } from './tariff';

export interface Order {
  orderStatusId: {
    name: string;
    id: string;
  };
  id: string;
  cityId: City;
  pointId: Point;
  carId: Car;
  color: string;
  dateFrom: number;
  dateTo: number;
  rateId: Tariff;
  price: number;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
}

export interface OrderPrice {
  price?: number;
  priceMin?: number;
}

export enum OrderStep {
  location = 'location',
  model = 'model',
  option = 'option',
  summary = 'summary',
  confirmModal = 'summary/confirm',
  confirm = 'confirm',
  cancelModal = 'confirm/cancel',
}
