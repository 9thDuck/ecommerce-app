export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  popular?: boolean;
  stock: number;
};

export type CartItem = Pick<
  Product,
  "id" | "title" | "image" | "price" | "stock"
> & {
  quantity?: number;
};
