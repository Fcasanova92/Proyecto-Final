import fs from 'fs';
import { BadRequest } from '../../errors/badRequest.js';

export const saveProduct = async (product, path, action) => {
    try {
        await fs.promises.access(`${path}/db/product.json`).catch(async () => {
            await fs.promises.writeFile(`${path}/db/product.json`, JSON.stringify([], null, 2));
        });
        await fs.promises.writeFile(`${path}/db/product.json`, JSON.stringify(product, null, 2));
        return { message: `Se logró ${action} correctamente el producto.` };
    } catch (error) {

        throw new Error(error.message)
    }
};

export const getAllProduct = async (path) => {
    try {
        const productJson = JSON.parse(await fs.promises.readFile(`${path}/db/product.json`, "utf-8"));
        return productJson
   

    } catch (error) {
        throw new Error(error.message)
    }
};

export const getProductById = async (id, path) => {
    try {


        if (!id) {
              throw new Error ("No se ingresó un ID válido") ;
         }
        const idProduct = parseInt(id, 10);
        const products = JSON.parse(await fs.promises.readFile(`${path}/db/product.json`, "utf-8"));

        const product = products.find(product => product.id === idProduct);
        if (!product) {
            throw new BadRequest(`No existe el producto con id: ${id}`)
        }
        return product;
    } catch (error) {
        throw new Error(error.message)
    }
};