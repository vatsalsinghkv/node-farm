export type ProductType = {
  id: number;
  productName: string;
  image: string;
  from: string;
  nutrients: string;
  quantity: [number, string];
  price: number;
  organic: boolean;
  description: string;
};
