import { City } from './city';
import { Point } from './point';

export interface Order {
  orderStatusId: number;
  cityId: City;
  pointId: Point;
  carId: number;
  color: string;
  dateFrom: number;
  dateTo: number;
  rateId: number;
  price: number;
  isFullTank: boolean;
  isNeedChildChair: boolean;
  isRightWheel: boolean;
}

export interface OrderPrice {
  priceTotal?: number;
  priceMin?: number;
}

export enum OrderStep {
  location = 'location',
  model = 'model',
  option = 'option',
  summary = 'summary',
  confirm = 'summary/confirm',
}
