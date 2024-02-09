import { Category, Order, Product, User, Table, ShoppingCart } from './declarations';
import { v4 as uuidv4 } from 'uuid';

export class AmazonApp {
  // #region PROPERTIES
  name: string = 'AmazonApp';
  #userLogged: Omit<User, 'password'> | null = null;
  // TABLES
  #users: Table<User> = {};
  #products: Table<Product> = {};
  #shoppingCart: Table<ShoppingCart> = {};
  #orders: Table<Order> = {};
  categories: Table<Category> = {};
  // TABLES RELATIONS
  #userOrders: Table<Array<Order['id']>> = {};
  #userProducts: Table<Array<Product['id']>> = {};
  #userShoppingCart: Table<ShoppingCart['id']> = {};
  #produtctSeller: Table<User['id']> = {};
  #productCategory: Table<Category['id']> = {};
  #orderProducts: Table<Array<Product['id']>> = {};
  #shoppingCartUser: Table<User['id']> = {};
  #shoppingCartProducts: Table<
    Array<{
      idProduct: Product['id'];
      date: Date;
    }>
  > = {};
  // #endregion

  // #region METHODS
  signUp({ email, password }: { email: string; password: string }) {
    const existingUser = Object.values(this.#users).find(u => u.email === email);
    if (existingUser) {
      throw new Error('Email già esistente');
    }
    const id = uuidv4();
    this.#users[id] = {
      id,
      email,
      password,
      isActive: false,
      isBusiness: false,
      name: '',
      lastName: '',
      phoneNumber: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
      },
    };
    return this.#users[id];
  }

  login({ email, password }: { email: string; password: string }) {
    if (this.#userLogged) {
      throw new Error('Utente già loggato');
    }
    const user: User | undefined = Object.values(this.#users).find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Utente non trovato');
    } else {
      user.password = '';
      user.isActive = true;
      this.#userLogged = user;
      console.log('Utente loggato', this.#userLogged);
    }
  }

  logout() {
    if (!this.#userLogged) {
      throw new Error('Utente non loggato');
    }
    this.#userLogged = null;
    console.log('Utente sloggato', this.#userLogged);
  }

  deleteUser() {
    if (!this.#userLogged) {
      throw new Error('Utente non loggato');
    }
    this.#users[this.#userLogged.id].isActive = false;
    this.#userLogged = null;
    console.log('Utente cancellato', this.#userLogged);
  }
  getUserLogged() {
    return this.#userLogged;
  }
  upgradeUserToSeller() {
    if (!this.#userLogged) {
      throw new Error('Utente non loggato');
    } else {
      this.#userLogged.isBusiness = true;
      this.#users[this.#userLogged.id].isBusiness = true;
    }
  }

  getProducts() {}
  addProductToCart() {}
  removeProductFromCart() {}
  addProductToStore() {}
  removeProductFromStore() {}

  checkout() {}
  getOrders() {}
  createOrder() {}
  deleteOrder() {}
  removeProductFromOrder() {}

  addCategory() {}
  removeCategory() {}
  getCategories() {}

  // #endregion
}
