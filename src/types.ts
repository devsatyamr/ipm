export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  addresses: Address[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  seller: string;
  location: string;
  category: string;
  image: string;
  rating: number;
  stock: number;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  addressId: string;
  createdAt: string;
}