import { Router } from 'express';
import { cartMiddleware } from '../../../middleware/index.js';
import {
  getCartById,
  createCart,
  updateQuantityProduct,
  updateProducts,
  deleteProdInCart,
  deleteCart,
} from '../../../controllers/cart.controller.js';

export const router = Router();

router.get('/:cid', cartMiddleware.validateCartsId, getCartById);

router.post('/', createCart);

// endpoint para actualizar la cantidad del producto del carrito, debe de ser cambiar la cantidad dentro de la visual del carrito
router.put('/:cid/products/:pid', updateQuantityProduct);

router.patch('/:cid/products/:pid', updateProducts);

// eliminar los productos del carrito

router.delete('/:cid/products/:pid', deleteProdInCart);

// elimina el carrito completo

router.delete('/:cid', deleteCart);
