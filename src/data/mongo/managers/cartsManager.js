import { InternalServerError } from '../../../utils/errors.js';
import { cartModel } from '../models/carts.js';

import { Manager } from './manager.js';

export class CartsManager extends Manager {
  constructor() {
    super(cartModel);
  }

  async destroyProductInCart(pid, cid) {
    try {
      const deleteRecord = await this.model.updateOne(
        { _id: cid }, // Encuentra el carrito por su id
        {
          $pull: { idProduct: pid }, // Elimina el producto del array de productos
        }
      );
      if (deleteRecord) {
        return { message: 'Se logró eliminar correctamente el producto.' };
      }
    } catch (error) {
      throw InternalServerError(error.message);
    }
  }
}

export const { read, create, destroyProductInCart, readById, destroy, update } =
  new CartsManager();
