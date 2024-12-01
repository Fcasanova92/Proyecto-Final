import { __dirname } from '../../utils/mongoose.js';
import {
  addProductToDb,
  updateProductInDb,
  getAllProductsFromDb,
  getProductByIdFromDb,
  deleteProductFromDb,
  getProductsFromDbWithFilter,
} from '../../mongo/querys/productQuerys.js';

export class ProductManager {
  constructor() {
    this.path = __dirname;
  }

  async addProduct(productData) {
    try {
      const products = await getAllProductsFromDb();

      const ids = products.map((product) => product.pid);
      const lastIdProduct = ids.length > 0 ? Math.max(...ids) : 0;
      const productId = lastIdProduct + 1;

      const newProduct = { pid: productId, ...productData };

      const response = await addProductToDb(newProduct);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAll(limit, page, query, sort) {
    try {
      const products = await getProductsFromDbWithFilter(
        limit,
        page,
        query,
        sort
      );
      return products.payload.length > 0 ? products : [];
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const product = await getProductByIdFromDb(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const response = await deleteProductFromDb(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, updateData) {
    try {
      const productById = await getProductByIdFromDb(id);
      const updatedProduct = { ...productById, ...updateData };
      return await updateProductInDb(id, updatedProduct);
    } catch (error) {
      throw error;
    }
  }
}

export const { updateProduct, deleteProduct, getById, getAll, addProduct } =
  new ProductManager();
