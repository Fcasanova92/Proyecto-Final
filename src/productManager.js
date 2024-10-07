import {__dirname} from "./utils.js"
import { addProductToDb, updateProductToDb, getAllProductFromDb, getProductByIdFromDb, deleteProductFromDb, getProductsFromDbWithFilter } from "./db/helpers/productQuerys.js";
import { BadRequest } from "./errors/badRequest.js";

const requiredFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails'];

export class ProductManager {

    constructor(){

        this.path = __dirname;

    }
    async addProduct(producto) {
        try {
            const productFieldKeys = Object.keys(producto);

            for (const field of requiredFields) {
                if (!productFieldKeys.includes(field) || producto[field] === '') {
                   throw new BadRequest(`El campo "${field}" es obligatorio.`);
                }
            }

            const products = await getAllProductFromDb();

            const existCodeProduct = products.some((obj) => obj.code === producto.code);

            if (existCodeProduct) {
                throw new BadRequest ("El código del producto debe de ser único");
            }

            const ids = products.map((product) => product.pid);
            const lastIdProduct = ids.length > 0 ? Math.max(...ids) : 0;
            const productId = lastIdProduct + 1;
            const newProduct = { pid: productId, ...producto };
        
            return await addProductToDb(newProduct);

        } catch (error) {

            throw error
        }
    }

    async getAll(limit, page, query, sort) {
        try {

            const products = await getProductsFromDbWithFilter(limit, page, query, sort);
            return products.length > 0 ? products : [];
        } catch (error) {
            throw error
        }}

    async getById(id) {
        try {
            const product = await getProductByIdFromDb(id);
            return product;
        } catch (error) {

            throw error
        }
    }

    async deleteProduct(id) {
        try {

            return await deleteProductFromDb(id);

        } catch (error) {
            throw error
        }
    }

    async updateProduct(id, updateField) {
        const {code, ...updateData} = updateField
        if(code){
            throw new BadRequest("No se puede actualizar el codigo del producto")
        }
        try {
            const updateFieldKeys = Object.keys(updateField);
            for (const upfield of updateFieldKeys) {
                if (!requiredFields.includes(upfield)) {
                   throw new BadRequest (`El campo ${upfield} no es propio del producto`);
                }
            }
            const productById = await getProductByIdFromDb(id);
  
            const updatedProduct = { ...productById, ...updateData };

            return await updateProductToDb(id, updatedProduct);

        } catch (error) {
            throw error
        }
    }
}



