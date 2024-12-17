import { InternalServerError } from '../../../utils/errors.js';
import { productModel } from '../models/product.js';
import { Manager } from './manager.js';

export class ProductManager extends Manager {
  constructor() {
    super(productModel);
  }

  readPaginate = async (limit, page, query, sort) => {
    try {
      const filter = query ? { title: { $regex: query, $options: 'i' } } : {};
      const sortCriteria =
        sort === 'asc' ? { pid: 1 } : sort === 'desc' ? { pid: -1 } : {};
      const options = { page, limit, sort: sortCriteria, lean: true };

      const result = await this.model.paginate(filter, options);
      const {
        docs: products,
        totalPages,
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage,
      } = result;
      return {
        status: 'success',
        payload: products,
        totalPages,
        hasNextPage,
        hasPrevPage,
        page,
        prevLink: hasPrevPage
          ? `http://localhost:8080/?page=${prevPage}&limit=${limit}`
          : null,
        nextLink: hasNextPage
          ? `http://localhost:8080/?page=${nextPage}&limit=${limit}`
          : null,
      };
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  };
}

export const { readPaginate, read, readById, destroy, update, create } =
  new ProductManager();
