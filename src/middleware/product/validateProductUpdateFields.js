import { REQUIRED_PRODUCT_FIELDS } from '../validators/products/productValidation.js';
import { BadRequest } from '../../utils/errors.js';

export const validateProductUpdateFields = (req, res, next) => {
  const { code, ...updateFields } = req.body;

  const updateFieldKeys = Object.keys(updateFields);

  if (code) {
    throw new BadRequest('No se puede actualizar el codigo del producto');
  }

  const emptyFields = updateFieldKeys.filter(
    (field) => !updateFields[field] || updateFields[field].trim() === ''
  );

  if (emptyFields.length > 0) {
    throw new BadRequest({
      message: 'Existen campos vacíos o nulos',
      fields: emptyFields,
    });
  }

  const fieldWrongs = updateFieldKeys.filter(
    (field) => !REQUIRED_PRODUCT_FIELDS.includes(field)
  );

  if (fieldWrongs.length > 0) {
    throw new BadRequest({
      message: 'Existen campos no válidos',
      fields: fieldWrongs,
    });
  }

  next();
};
