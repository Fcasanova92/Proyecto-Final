import { Router } from 'express';
import { productMiddleware } from '../../../middleware/index.js';
import {
  getProduct,
  getById,
  create,
  update,
  deleteProd,
} from '../../../controllers/product.controller.js';
import { passportCall } from '../../../middleware/session/passportCall.js';

export const router = Router();

router.get('/', getProduct);

router.post(
  '/',
  passportCall('admin'),
  [
    productMiddleware.validateRequiredProductFields,
    productMiddleware.validateProductCode,
  ],
  create
);

router.get('/:pid', productMiddleware.validateProductId, getById);

router.patch(
  '/:pid',
  [
    passportCall('admin'),
    productMiddleware.validateProductId,
    productMiddleware.validateProductUpdateFields,
  ],
  update
);

router.delete(
  '/:pid',
  [passportCall('admin'), productMiddleware.validateProductId],
  deleteProd
);
