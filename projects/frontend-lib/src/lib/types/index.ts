export type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}

export type CartProduct = {
  id: string;
  name: string;
  img: string;
  price: number;
  discount: number;
  quantity: number;
  stock: number;
}

export type Cart = {
  id: string;
  products: CartProduct[];
  total: number;
  discountPercentage: number;
  discount: number;
  deliveryFee: number;
}

export type Product = {
  id: string;
  name: string;
  price: number;
  priceWithDiscount: number;
  discount: number;
  description: string;
  stock: number;
  rating: number;
  img: string;
}
