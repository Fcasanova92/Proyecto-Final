import { Router } from 'express';
import { productMiddleware } from '../../middleware/index.js';
import {
  addProduct,
  deleteProduct,
  getAll,
  getById,
  updateProduct,
} from '../../mongo/managers/productManager.js';
import passport from 'passport';

export const router = Router();

router.get(
  '/',
  passport.authenticate('admin', { session: false }),
  async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const page = parseInt(req.query.page) || 1;
      const query = req.query.query || '';
      const sort = req.query.sort || 'desc';
      const products = await getAll(limit, page, query, sort);

      if (products.payload.length === 0) {
        return res.status(404).json({ message: 'No existen productos' });
      }

      return res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('admin', { session: false }),
  [
    productMiddleware.validateRequiredProductFields,
    productMiddleware.validateProductCode,
  ],
  async (req, res, next) => {
    try {
      const data = req.body;
      const createProduct = await addProduct(data);
      return res.status(200).json({ message: createProduct.message });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:pid',
  [
    passport.authenticate('admin', { session: false }),
    productMiddleware.validateProductId,
  ],
  async (req, res, next) => {
    const id = parseInt(req.params.pid);

    try {
      const productById = await getById(id);

      return res.status(200).json({ ...productById });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:pid',
  [
    passport.authenticate('admin', { session: false }),
    productMiddleware.validateProductId,
    productMiddleware.validateProductUpdateFields,
  ],
  async (req, res, next) => {
    try {
      const id = parseInt(req.params.pid);
      const updateData = req.body;
      const prodUpdate = await updateProduct(id, updateData);
      return res.status(200).json({ message: prodUpdate.message });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:pid',
  [
    passport.authenticate('admin', { session: false }),
    productMiddleware.validateProductId,
  ],
  async (req, res, next) => {
    try {
      const id = parseInt(req.params.pid);
      const prodDelete = await deleteProduct(id);
      return res.status(200).json({ message: prodDelete.message });
    } catch (error) {
      next(error);
    }
  }
);
