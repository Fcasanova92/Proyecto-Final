import { getCartByIdFromDb } from '../../mongo/querys/cartsQuerys.js';
import { BadRequest, NotFound } from '../../utils/errors.js';

export const validateCartsId = async (req, res, next) => {
  const { cid } = req.params;

  // Validar si el ID es un número válido
  if (!cid || isNaN(cid)) {
    return next(
      new BadRequest(
        'El ID del carrito proporcionado no tiene un formato válido'
      )
    );
  }

  try {
    const cart = await getCartByIdFromDb(parseInt(cid, 10));

    if (!cart) {
      throw new NotFound('El carrito seleccionado no existe');
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const middleware = { validateCartsId };
