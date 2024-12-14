import {
  getAll,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../data/mongo/managers/productManager.js';

export class ProductService {
  getProductService = async (limit, page, query, sort) => {
    try {
      await getAll(limit, page, query, sort);
    } catch (error) {
      throw error;
    }
  };
  // este metodo es particular, ya que devuelve paginado, poner la logica aca si existiese

  getProductById = async (id) => {
    try {
      await getById(id);
    } catch (error) {
      throw error;
    }
  };

  createProduct = async (data) => {
    try {
      await addProduct(data);
    } catch (error) {
      throw error;
    }
  };
  //poner la logica de update en este punto, sacar lo demas del manager
  updateProduct = async (id, updateData) => {
    try {
      await updateProduct(id, updateData);
    } catch (error) {
      throw error;
    }
  };

  deleteProduct = async (id) => {
    try {
      await deleteProduct(id);
    } catch (error) {
      throw error;
    }
  };
}
