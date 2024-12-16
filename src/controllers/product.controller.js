import {
  createProductService,
  getProductByIdService,
  getProductService,
  updateProductService,
  deleteProductService,
} from '../services/product.service.js';

class ProductController {
  getProduct = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const page = parseInt(req.query.page) || 1;
      const query = req.query.query || '';
      const sort = req.query.sort || 'desc';
      const products = await getProductService(limit, page, query, sort);
      if (products.payload.length === 0) {
        throw new BadRequest('no existen productos');
      }
      return res.status(200).json({ data: products, message: null });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    const id = parseInt(req.params.pid);
    const productById = await getProductByIdService(id);
    try {
      return res.status(200).json({ data: productById, message: null });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const data = req.body;
      const createProduct = await createProductService(data);
      return res
        .status(200)
        .json({ data: null, message: createProduct.message });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const id = parseInt(req.params.pid);
      const updateData = req.body;
      const prodUpdate = await updateProductService(id, updateData);
      return res.status(200).json({ data: null, message: prodUpdate.message });
    } catch (error) {
      next(error);
    }
  };

  deleteProd = async (req, res, next) => {
    try {
      const id = parseInt(req.params.pid);
      const prodDelete = await deleteProductService(id);
      return res.status(200).json({ data: null, message: prodDelete.message });
    } catch (error) {
      next(error);
    }
  };
}

const controller = new ProductController();

export const { getProduct, getById, create, update, deleteProd } = controller;
