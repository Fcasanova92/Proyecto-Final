import fs from 'fs';
import { BadRequest } from '../../errors/badRequest.js';
import { InternalServerError } from '../../errors/internalServerError.js';
import { join } from 'path';

export const saveProduct = async (product, path, action) => {
    const pathToProductJson = join(path, 'db', 'product.json');
    try {
        await fs.promises.access(pathToProductJson).catch(async () => {
            await fs.promises.writeFile(pathToProductJson, JSON.stringify([], null, 2));
        });
        await fs.promises.writeFile(pathToProductJson, JSON.stringify(product, null, 2));
        return { message: `Se logró ${action} correctamente el producto.` };
    } catch (error) {

        throw new InternalServerError(error.message)
    }
};

export const getAllProduct = async (limit, path) => {
    const pathToProductJson = join(path, 'db', 'product.json');
    try {
        const productJson = JSON.parse(await fs.promises.readFile(pathToProductJson, "utf-8"));
        if(limit){
            const productJsonWithLimit = productJson.length <= limit ? productJson : productJson.slice(0, limit);
            return productJsonWithLimit;
        }
        return productJson;

    } catch (error) {
        throw new InternalServerError(error.message)
    }
};

export const getProductById = async (id, path) => {

    const pathToProductJson = join(path, 'db', 'product.json');
    try {

        if (!id) {
              throw new BadRequest ("No se ingresó un ID válido") ;
         }
        const idProduct = parseInt(id, 10);
        const products = JSON.parse(await fs.promises.readFile(pathToProductJson, "utf-8"));

        const product = products.find(product => product.id === idProduct);
        if (!product) {
            throw new BadRequest(`No existe el producto con id: ${id}`)
        }
        return product;
    } catch (error) {
        if(error instanceof BadRequest){
            throw error
        }
        throw new InternalServerError(error)
   
    }
};