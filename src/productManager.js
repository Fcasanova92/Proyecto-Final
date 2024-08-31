import {dirname} from "path"
import { fileURLToPath } from "url";
import { saveProduct, getAllProduct, getProductById } from "./db/helpers/dbQuerys.js";
import { BadRequest } from "./errors/badRequest.js";

const requiredFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails'];

export class ProductManager {

    constructor(){

        this.path = dirname(fileURLToPath(import.meta.url))

    }
    async addProduct(producto) {
        try {
            const productFieldKeys = Object.keys(producto);

            for (const field of requiredFields) {
                if (!productFieldKeys.includes(field) || producto[field] === '') {
                   throw new BadRequest(`El campo "${field}" es obligatorio.`);
                }
            }

            const products = await getAllProduct(this.path);

            const existCodeProduct = products.some((obj) => obj.code === producto.code);

            if (existCodeProduct) {
                throw new BadRequest ("El código del producto debe de ser único");
            }

            const ids = products.map((product) => product.id);
            const lastIdProduct = ids.length > 0 ? Math.max(...ids) : 0;
            const productId = lastIdProduct + 1;

            const newProduct = { id: productId, ...producto };
            products.push(newProduct);

            return await saveProduct(products, this.path, "guardar");

        } catch (error) {

            throw error
        }
    }

    async getAll() {
        try {
            const products = await getAllProduct(this.path);
            if (products.length === 0) {
                throw new BadRequest("No se encontraron productos")
            }
            return products ;
        } catch (error) {
            throw error
        }}

    async getById(id) {
        try {
            const product = await getProductById(id, this.path);
            return product;
        } catch (error) {

            throw error
        }
    }

    async deleteProduct(id) {
        try {
            const productExists = await getProductById(id, this.path);
            const products = await getAllProduct(this.path);
            const deletedProducts = products.filter((product) => product.id !== productExists.id);

            return await saveProduct(deletedProducts, this.path, "borrar");

        } catch (error) {
            throw error
        }
    }

    async updateProduct(id, updateField) {
        try {
            const updateFieldKeys = Object.keys(updateField);
            for (const upfield of updateFieldKeys) {
                if (!requiredFields.includes(upfield)) {
                    return { status: false, message: `El campo ${upfield} no es propio del producto.` };
                }
            }
            const productById = await getProductById(id, this.path);
            const products = await getAllProduct(this.path);
            const updatedProduct = { ...productById, ...updateField };

            const updatedProducts = products.map((product) => {
                return product.id === updatedProduct.id ? updatedProduct : product;
            });

            return await saveProduct(updatedProducts, this.path, "actualizar");

        } catch (error) {
            throw error
        }
    }
}



