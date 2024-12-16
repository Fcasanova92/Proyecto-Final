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
      await readById(idCart);
    } catch (error) {
      throw error;
    }
  };
  createCartService = async () => {
    try {
      await create();
    } catch (error) {
      throw error;
    }
  };
  updateCartService = async (idProduct, idCart, newquantity = null) => {
    try {
      const cart = this.readByIdCartService(idCart);
      let quantity = 1;
      const validate = cart.find((prod) => prod._id === idProduct);
      if (validate) {
        if (newquantity) {
          quantity = newquantity;
        }
        quantity = quantity + 1;
      }
      const data = {
        product_id: idProduct,
        quantity,
      };
      await update(idCart, data);
    } catch (error) {
      throw error;
    }
  };
  destroyProdInCartService = async (idProduct, idCart) => {
    try {
      await destroyProductInCart(idProduct, idCart);
    } catch (error) {
      throw error;
    }
  };

  deleteCartService = async (idCart) => {
    try {
      await destroy(idCart);
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
