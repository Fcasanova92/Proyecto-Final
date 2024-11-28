import { __dirname } from '../../utils/mongoose.js';
import {
  getAllCartsFromDb,
  addCartInDb,
  addProductInCartIntoDb,
  getCartByIdFromDb,
  deleteCartFromDb,
  deleteProductInCartFromDB,
  updateQuatityInProductInCartFromDb,
} from '../../mongo/querys/cartsQuerys.js';
import { getProductByIdFromDb } from '../../mongo/querys/productQuerys.js';

export class CartsManager {
  constructor() {
    this.path = __dirname;
  }
  async addCart() {
    try {
      const allCarts = await getAllCartsFromDb();

      const ids = allCarts.map((cart) => cart.cid);

      const lastIdCart = ids.length > 0 ? Math.max(...ids) : 0;
      const cartId = lastIdCart + 1;

      const newCart = { cid: cartId, products: [] };

      allCarts.push(newCart);

      return await addCartInDb(allCarts);
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const carts = await getCartByIdFromDb(id);
      return carts;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(pid, cid) {
    try {
      const cartById = await getCartByIdFromDb(cid);
      const productById = await getProductByIdFromDb(pid);

      const productInCart = cartById.products.find(
        (prod) => prod.idProduct._id.toString() === productById._id.toString()
      );

      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        const newProduct = { idProduct: productById._id, quantity: 1 };
        cartById.products.push(newProduct);
      }

      return await addProductInCartIntoDb(cid, cartById);
    } catch (error) {
      throw error;
    }
  }

  async deleteCart(cid) {
    try {
      return await deleteCartFromDb(cid);
    } catch (error) {
      throw error;
    }
  }

  async deleteProductInCart(pid, cid) {
    try {
      return await deleteProductInCartFromDB(pid, cid);
    } catch (error) {
      throw error;
    }
  }

  async updateQuatityInProductInCart(pid, cid, newQuantity) {
    try {
      const cartById = await getCartByIdFromDb(cid);
      const productById = await getProductByIdFromDb(pid);
      const productByIdInCart = cartById.products.find(
        (prod) => prod.idProduct._id.toString() === productById._id.toString()
      );

      if (newQuantity) productByIdInCart.quantity = newQuantity;

      return await updateQuatityInProductInCartFromDb(cid, cartById);
    } catch (error) {
      throw error;
    }
  }
}
