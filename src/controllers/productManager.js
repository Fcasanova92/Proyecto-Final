import { __dirname } from "./utils.js";
import {
    addProductToDb,
    updateProductInDb,
    getAllProductsFromDb,
    getProductByIdFromDb,
    deleteProductFromDb,
    getProductsFromDbWithFilter
} from "./db/helpers/productQuerys.js";
import { InternalServerError } from "./errors/internalServerError.js";

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
            throw new InternalServerError(`Error al agregar producto: ${error.message}`);
        }
    }

    async getAll(limit, page, query, sort) {
        try {
            const products = await getProductsFromDbWithFilter(limit, page, query, sort);
            return products.payload.length > 0 ? products : [];
        } catch (error) {
            throw new InternalServerError(`Error al obtener productos: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const product = await getProductByIdFromDb(id);
            return product;
        } catch (error) {
            throw new InternalServerError(`Error al obtener producto con ID ${id}: ${error.message}`);
        }
    }

    async deleteProduct(id) {
        try {
            const response = await deleteProductFromDb(id);
            return response;
        } catch (error) {
            throw new InternalServerError(`Error al eliminar producto con ID ${id}: ${error.message}`);
        }
    }

    async updateProduct(id, updateData) {
        try {
            const productById = await getProductByIdFromDb(id);
            const updatedProduct = { ...productById, ...updateData };
            return await updateProductInDb(id, updatedProduct);
        } catch (error) {
            throw new InternalServerError(`Error al actualizar producto con ID ${id}: ${error.message}`);
        }
    }
}