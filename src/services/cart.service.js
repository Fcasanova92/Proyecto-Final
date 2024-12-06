import {
  getById,
  addCart,
  updateQuatityInProductInCart,
  addProductToCart,
  deleteProductInCart,
  deleteCart,
} from '../data/mongo/managers/cartsManager.js';

export class CartService {
  getCartService = async (idCart) => await getById(idCart);
  createCartService = async () => await addCart();
  updateQuantityService = async (idProduct, idCart, newQuantity) =>
    await updateQuatityInProductInCart(idProduct, idCart, newQuantity);
  updateProdInCartService = async (idProduct, idCart) =>
    await addProductToCart(idProduct, idCart);
  deleteProdInCartService = async (idProduct, idCart) =>
    await deleteProductInCart(idProduct, idCart);
  deleteCartService = async () => await deleteCart(idCart);
}
