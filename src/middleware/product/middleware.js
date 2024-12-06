import { PRODUCT_ERROR_MESSAGES } from '../../constant/productErrorMessage.js';
import { REQUIRED_PRODUCT_FIELDS } from '../../constant/requiredProductField.js';
import { getAll } from '../../data/mongo/managers/productManager.js';
import { getProductByIdFromDb } from '../../data/mongo/querys/productQuerys.js';
import { BadRequest, NotFound } from '../../utils/errors.js';

export const validateProductId = async (req, res, next) => {
  const { pid } = req.params;
  try {
    if (isNaN(pid)) {
      throw new NotFound(PRODUCT_ERROR_MESSAGES.INVALID_ID);
    }
    const product = await getProductByIdFromDb(parseInt(pid));

    if (!product) {
      throw new BadRequest(PRODUCT_ERROR_MESSAGES.PRODUCT_NOT_FOUND(pid));
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const validateProductUpdateFields = (req, res, next) => {
  try {
    const { code, ...updateFields } = req.body;

    const updateFieldKeys = Object.keys(updateFields);

    if (code) {
      throw new BadRequest(PRODUCT_ERROR_MESSAGES.CODE_UPDATE_NOT_ALLOWED);
    }

    const emptyFields = updateFieldKeys.filter((field) => !updateFields[field]);

    if (emptyFields.length > 0) {
      throw new BadRequest({
        message: PRODUCT_ERROR_MESSAGES.EMPTY_OR_NULL_FIELDS,
        fields: emptyFields,
      });
    }

    const fieldWrongs = updateFieldKeys.filter(
      (field) => !REQUIRED_PRODUCT_FIELDS.includes(field)
    );

    if (fieldWrongs.length > 0) {
      throw new BadRequest({
        message: PRODUCT_ERROR_MESSAGES.INVALID_FIELDS,
        fields: fieldWrongs,
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validateRequiredProductFields = (req, res, next) => {
  try {
    const product = req.body;
    const productFieldKeys = Object.keys(product);

    const fieldRequired = REQUIRED_PRODUCT_FIELDS.filter(
      (field) => !productFieldKeys.includes(field) || !product[field]
    );

    if (fieldRequired.length > 0) {
      throw new BadRequest({
        message: PRODUCT_ERROR_MESSAGES.MISSING_REQUIRED_FIELDS,
        fields: fieldRequired,
      });
    }

    const invalidFields = productFieldKeys.filter(
      (field) => !REQUIRED_PRODUCT_FIELDS.includes(field)
    );

    if (invalidFields.length > 0) {
      throw new BadRequest({
        message: PRODUCT_ERROR_MESSAGES.INVALID_FIELDS,
        fields: invalidFields,
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validateProductCode = async (req, res, next) => {
  try {
    const { code } = req.body;
    const { payload } = await getAll();
    const codeExist = payload.some((prod) => prod.code === code);

    if (codeExist) {
      throw new BadRequest(PRODUCT_ERROR_MESSAGES.CODE_UNIQUE);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const middleware = {
  validateProductId,
  validateProductUpdateFields,
  validateRequiredProductFields,
  validateProductCode,
};
