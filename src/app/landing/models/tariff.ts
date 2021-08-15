export interface Tariff {
  rateTypeId: {
    unit: TariffUnit;
    name: string;
    id: string;
  };
  price: number;
  id: string;
}

export enum TariffUnit {
  minutes = 'мин',
  days = 'сутки',
  weeks = '7 дней',
  months = '30 дней',
}
