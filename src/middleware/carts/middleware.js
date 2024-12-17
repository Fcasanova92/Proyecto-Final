import { readByIdCartService } from '../../services/cart.service.js';
import { BadRequest, NotFound } from '../../utils/errors.js';

export const validateCartsId = async (req, res, next) => {
  const id = req.params.cid;
  try {
    if (!id) {
      return next(
        new BadRequest(
          'El ID del carrito proporcionado no tiene un formato válido'
        )
      );
    }
    const cart = await readByIdCartService(id);

    if (!cart) {
      throw new NotFound('El carrito seleccionado no existe');
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const middleware = { validateCartsId };
