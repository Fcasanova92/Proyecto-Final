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
      const idCart = req.params.cid;
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
      const data = req.body;
      const create = await createCartService(data);
      return res
        .status(200)
        .json({ data: { id: create._id }, message: 'Carrito Creado' });
    } catch (error) {
      next(error);
    }
  };

  updateQuantityProduct = async (req, res, next) => {
    try {
      const idProduct = req.params.pid;
      const idCart = req.params.cid;
      const newQuantity = req.body.quantity;
      const productQuantityUpdate = await updateCartService(
        idProduct,
        idCart,
        newQuantity
      );

      return res.status(200).json({
        data: productQuantityUpdate,
        message: 'Cantidad del producto actualizada en el carrito',
      });
    } catch (error) {
      next(error);
    }
  };

  deleteProdInCart = async (req, res, next) => {
    try {
      const idCart = req.params.cid;
      const idProduct = req.params.pid;
      const delProd = await destroyProdInCartService(idProduct, idCart);

      return res.status(200).json({ data: null, message: delProd.message });
    } catch (error) {
      next(error);
    }
  };

  deleteCart = async (req, res, next) => {
    try {
      const idCart = req.params.cid;
      await deleteCartService(idCart);
      return res
        .status(200)
        .json({ data: null, message: 'Se elimino el carrito' });
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
