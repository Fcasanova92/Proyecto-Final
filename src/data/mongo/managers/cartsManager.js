import { InternalServerError } from '../../../utils/errors.js';
import { cartModel } from '../models/carts.js';

import { Manager } from './manager.js';

export class CartsManager extends Manager {
  constructor() {
    super(cartModel);
  }

  destroyProductInCart = async (pid, cid) => {
    try {
      const deleteRecord = await this.model.updateOne(
        { _id: cid }, // Encuentra el carrito por su id
        {
          $pull: { product: { product_id: pid } }, // Elimina el producto del array de productos
        }
      );
      if (deleteRecord) {
        return { message: 'Se logró eliminar correctamente el producto.' };
      }
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  };
}

export const { read, create, destroyProductInCart, readById, destroy, update } =
  new CartsManager();
