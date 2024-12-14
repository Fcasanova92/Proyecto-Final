import { ProductService } from '../services/product.service.js';
import { BadRequest } from '../utils/errors.js';

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  getProduct = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const page = parseInt(req.query.page) || 1;
      const query = req.query.query || '';
      const sort = req.query.sort || 'desc';
      const products = await this.productService.getProductService(
        limit,
        page,
        query,
        sort
      );
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
    const productById = await this.productService.getProductById(id);
    try {
      return res.status(200).json({ data: productById, message: null });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const data = req.body;
      const createProduct = await this.productService.createProduct(data);
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
      const prodUpdate = await this.productService.updateProduct(
        id,
        updateData
      );
      return res.status(200).json({ data: null, message: prodUpdate.message });
    } catch (error) {
      next(error);
    }
  };

  deleteProd = async (req, res, next) => {
    try {
      const id = parseInt(req.params.pid);
      const prodDelete = await this.productService.deleteProduct(id);
      return res.status(200).json({ data: null, message: prodDelete.message });
    } catch (error) {
      next(error);
    }
  };
}

const controller = new ProductController();

export const { getProduct, getById, create, update, deleteProd } = controller;
