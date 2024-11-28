import { getProductByIdFromDb } from '../../mongo/querys/productQuerys.js';
import { BadRequest, NotFound } from '../../utils/errors.js';

export const validateProductId = async (req, res, next) => {
  const { pid } = req.params;

  if (isNaN(pid)) {
    throw new NotFound('El ID del producto proporcionado no es válido');
  }
  try {
    const product = await getProductByIdFromDb(parseInt(pid));

    if (!product) {
      throw new BadRequest(`Producto con ID ${pid} no encontrado.`);
    }
    next();
  } catch (error) {
    next(error);
  }
};
