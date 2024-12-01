export const PRODUCT_ERROR_MESSAGES = {
  INVALID_ID: 'El ID del producto proporcionado no es válido',
  PRODUCT_NOT_FOUND: (id) => `Producto con ID ${id} no encontrado.`,
  CODE_UPDATE_NOT_ALLOWED: 'No se puede actualizar el código del producto',
  EMPTY_OR_NULL_FIELDS: 'Existen campos vacíos o nulos',
  INVALID_FIELDS: 'Existen campos no válidos',
  MISSING_REQUIRED_FIELDS: 'Faltan campos requeridos o tienen datos vacíos',
  CODE_UNIQUE: 'El codigo del producto debe de ser unico',
};
