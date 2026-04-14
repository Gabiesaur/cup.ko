export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export type CartItem = Product & {
  quantity: number;
};
