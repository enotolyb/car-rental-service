export interface Car {
  updatedAt: number;
  createdAt: number;
  name: string;
  description: string;
  categoryId: {
    name: string;
    description: string;
    id: string;
  };
  priceMax: number;
  thumbnail: {
    size: number;
    originalname: string;
    mimetype: string;
    path: string;
  };
  priceMin: number;
  number: number;
  tank: number;
  colors: [];
  id: number;
}
