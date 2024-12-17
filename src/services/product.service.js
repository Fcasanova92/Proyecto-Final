import {
  read,
  readById,
  readPaginate,
  update,
  destroy,
  create,
} from '../data/mongo/managers/productManager.js';

export class ProductService {
  getProductService = async (limit, page, query, sort) => {
    try {
      return await readPaginate(limit, page, query, sort);
    } catch (error) {
      throw error;
    }
  };
  // este metodo es particular, ya que devuelve paginado, poner la logica aca si existiese

  getProductByIdService = async (id) => {
    try {
      return await readById(id);
    } catch (error) {
      throw error;
    }
  };

  createProductService = async (data) => {
    try {
      return await create(data);
    } catch (error) {
      throw error;
    }
  };
  //poner la logica de update en este punto, sacar lo demas del manager
  updateProductService = async (id, updateData) => {
    try {
      return await update(id, updateData);
    } catch (error) {
      throw error;
    }
  };

  deleteProductService = async (id) => {
    try {
      return await destroy(id);
    } catch (error) {
      throw error;
    }
  };
}

export const {
  getProductService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
} = new ProductService();
