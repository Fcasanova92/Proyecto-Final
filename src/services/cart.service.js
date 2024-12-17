import {
  create,
  destroy,
  destroyProductInCart,
  readById,
  update,
} from '../data/mongo/managers/cartsManager.js';

export class CartService {
  readByIdCartService = async (idCart) => {
    try {
      return await readById(idCart);
    } catch (error) {
      throw error;
    }
  };
  createCartService = async (data) => {
    try {
      return await create(data);
    } catch (error) {
      throw error;
    }
  };
  updateCartService = async (idProduct, idCart, newQuantity = null) => {
    try {
      const { product } = await this.readByIdCartService(idCart);

      const validate = product.find(
        (prod) => prod.product_id._id.toString() === idProduct
      );

      if (validate) {
        if (newQuantity !== null) {
          validate.quantity = newQuantity;
        } else {
          validate.quantity += 1;
        }
      } else {
        product.push({
          product_id: idProduct,
          quantity: newQuantity || 1,
        });
      }

      return await update(idCart, { product });
    } catch (error) {
      throw error;
    }
  };
  destroyProdInCartService = async (idProduct, idCart) => {
    try {
      return await destroyProductInCart(idProduct, idCart);
    } catch (error) {
      throw error;
    }
  };

  deleteCartService = async (idCart) => {
    try {
      return await destroy(idCart);
    } catch (error) {
      throw error;
    }
  };
}

const cartService = new CartService();

export const {
  readByIdCartService,
  createCartService,
  updateCartService,
  destroyProdInCartService,
  deleteCartService,
} = cartService;
