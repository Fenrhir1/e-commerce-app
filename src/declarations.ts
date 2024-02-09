export interface User {
  isActive: boolean;
  id: string;
  isBusiness: boolean;
  email: string;
  password: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface UserOrders {
  idUser: User['id'];
  idOrders: Array<Order['id']>;
}

export interface UserProducts {
  idUser: User['id'];
  idProducts: Array<Product['id']>;
}

export interface UserShoppingCart {
  idUser: User['id'];
  idShoppingCart: ShoppingCart['id'];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  cover: string;
  quantity: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Order {
  id: string;
  totalPrice: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface ShoppingCart {
  id: string;
}

export interface Table<T> {
  [key: string]: T;
}
