import {dirname} from "path"
import { fileURLToPath } from "url";
import { saveProduct, getAllProduct, getProductById } from "./db/helpers/dbQuerys.js";

const requiredFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails'];

export class ProductManager {

    constructor(){

        this.path = dirname(fileURLToPath(import.meta.url))

    }
    async addProduct(producto) {
        try {
            const productFieldKeys = new Set(Object.keys(producto));

            for (const field of requiredFields) {
                if (!productFieldKeys.has(field) || producto[field] === '') {
                    return { status: false, message: `El campo "${field}" es obligatorio.` };
                }
            }

            const products = await getAllProduct(this.path);

            const existCodeProduct = products.some((obj) => obj.code === producto.code);

            if (existCodeProduct) {
                return { status: false, message: "El código del producto debe de ser único" };
            }

            const ids = products.map((product) => product.id);
            const lastIdProduct = ids.length > 0 ? Math.max(...ids) : 0;
            const productId = lastIdProduct + 1;

            const newProduct = { id: productId, ...producto };
            products.push(newProduct);

            return await saveProduct(products, this.path, "guardar");

        } catch (error) {
            return { status: false, message: `Error al agregar el producto: ${error.message}` };
        }
    }

    async getAll() {
        try {
            const products = await getAllProduct(this.path);
            if (products.length === 0) {
                return { status: false, message: "No hay productos disponibles" };
            }
            return { status: true, products };
        } catch (error) {
            return { status: false, message: `Error al obtener los productos: ${error.message}` };
        }}

    async getById(id) {
        try {
            const product = await getProductById(id, this.path);
            return { status: true, product };
        } catch (error) {
            return { status: false, message: `Error al obtener el producto: ${error.message}` };
        }
    }

    async deleteProduct(id) {
        try {
            const productExists = await getProductById(id, this.path);
            const products = await getAllProduct(this.path);
            const deletedProducts = products.filter((product) => product.id !== productExists.id);

            return await saveProduct(deletedProducts, this.path, "borrar");

        } catch (error) {
            return { status: false, message: `Error al eliminar el producto: ${error.message}` };
        }
    }

    async updateProduct(id, updateField) {
        try {
            const updateFieldKeys = Object.keys(updateField);
            for (const upfield of updateFieldKeys) {
                if (!requiredFields.includes(upfield)) {
                    return { status: false, message: `El campo ${field} no es propio del producto.` };
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
            return { status: false, message: `Error al actualizar el producto: ${error.message}` };
        }
    }
}



