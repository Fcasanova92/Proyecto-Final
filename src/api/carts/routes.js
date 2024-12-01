import { Router } from 'express';
import { cartMiddleware } from '../../middleware/index.js';
import {
  addCart,
  addProductToCart,
  deleteCart,
  deleteProductInCart,
  getById,
  updateQuatityInProductInCart,
} from '../../mongo/managers/cartsManager.js';

export const router = Router();

router.get('/:cid', cartMiddleware.validateCartsId, async (req, res, next) => {
  try {
    const idCart = parseInt(req.params.cid);
    const carts = await getById(idCart);

    return res.status(200).json({ ...carts });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const createCart = await addCart();
    return res.status(200).json({ message: createCart.message });
  } catch (error) {
    next(error);
  }
});

// endpoint para actualizar la cantidad del producto del carrito, debe de ser cambiar la cantidad dentro de la visual del carrito
router.put('/:cid/products/:pid', async (req, res, next) => {
  try {
    const idProduct = parseInt(req.params.pid);

    const idCart = parseInt(req.params.cid);

    const newQuantity = req.body.quantity;

    const productQuantityUpdate = await updateQuatityInProductInCart(
      idProduct,
      idCart,
      newQuantity
    );
    return res.status(200).json({ message: productQuantityUpdate.message });
  } catch (error) {
    next(error);
  }
});

router.patch('/:cid/products/:pid', async (req, res, next) => {
  try {
    const idProduct = parseInt(req.params.pid);

    const idCart = parseInt(req.params.cid);

    const cartUpdate = await addProductToCart(idProduct, idCart);

    return res.status(200).json({ message: cartUpdate.message });
  } catch (error) {
    next(error);
  }
});

// eliminar los productos del carrito

router.delete('/:cid/products/:pid', async (req, res, next) => {
  try {
    const idCart = parseInt(req.params.cid);
    const idProduct = parseInt(req.params.pid);
    const createCart = await deleteProductInCart(idProduct, idCart);
    return res.status(200).json({ message: createCart.message });
  } catch (error) {
    next(error);
  }
});

// elimina el carrito completo

router.delete('/:cid', async (req, res, next) => {
  try {
    const idCart = parseInt(req.params.cid);
    const response = await deleteCart(idCart);
    return res.status(200).json({ message: response.message });
  } catch (error) {
    next(error);
  }
});
