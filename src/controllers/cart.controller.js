import {
  readByIdCartService,
  createCartService,
  updateCartService,
  deleteCartService,
  destroyProdInCartService,
} from '../services/cart.service.js';

class CartController {
  getCartById = async (req, res, next) => {
    // este enpodint se utiliza exclusivamente cuando se quiere leer la data del carrito
    // de la base de datos, si existiese
    try {
      const idCart = parseInt(req.params.cid);
      const cart = await readByIdCartService(idCart);
      return res.status(200).json({ data: cart, message: null });
    } catch (error) {
      next(error);
    }
  };

  createCart = async (req, res, next) => {
    try {
      // este endpoint se ejecuta cuando el usuario se logea, se crea un carrito en la base de datos con la data del carrito
      // del cliente si fuese necesario
      const create = await createCartService();
      return res.status(200).json({ data: null, message: create.message });
    } catch (error) {
      next(error);
    }
  };

  updateQuantityProduct = async (req, res, next) => {
    try {
      const idProduct = parseInt(req.params.pid);
      const idCart = parseInt(req.params.cid);
      const newQuantity = req.body.quantity;
      const productQuantityUpdate = await updateCartService(
        idProduct,
        idCart,
        newQuantity
      );
      return res
        .status(200)
        .json({ data: null, message: productQuantityUpdate.message });
    } catch (error) {
      next(error);
    }
  };

  deleteProdInCart = async (req, res, next) => {
    try {
      const idCart = parseInt(req.params.cid);
      const idProduct = parseInt(req.params.pid);
      const delProd = await destroyProdInCartService(idProduct, idCart);

      return res.status(200).json({ data: null, message: delProd.message });
    } catch (error) {
      next(error);
    }
  };

  deleteCart = async (req, res, next) => {
    try {
      const idCart = parseInt(req.params.cid);
      const delCart = await deleteCartService(idCart);
      return res.status(200).json({ data: null, message: delCart.message });
    } catch (error) {
      next(error);
    }
  };
}

const controller = new CartController();

export const {
  getCartById,
  createCart,
  deleteCart,
  updateQuantityProduct,
  deleteProdInCart,
} = controller;
