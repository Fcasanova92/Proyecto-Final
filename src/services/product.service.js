import {
  getAll,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../data/mongo/managers/productManager.js';

export class ProductService {
  getProductService = async (limit, page, query, sort) =>
    await getAll(limit, page, query, sort);

  getProductById = async (id) => await getById(id);

  createProduct = async (data) => await addProduct(data);

  updateProduct = async (id, updateData) => await updateProduct(id, updateData);

  deleteProduct = async (id) => await deleteProduct(id);
}
