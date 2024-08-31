
import { BadRequest } from '../../errors/badRequest.js';
import { InternalServerError } from '../../errors/internalServerError.js';
import { handleFileOperation } from './fs.js';

export const saveProduct = async (product, path, action) => {
    try {
        await handleFileOperation(path, product)
        return {message: `Se logró ${action} correctamente el producto.` }
    } catch (error) {

        throw new InternalServerError(error.message)
    }
};

export const getAllProduct = async (path) => {
    try {
        return await handleFileOperation(path, product);

    } catch (error) {
        throw new InternalServerError(error.message)
    }
};

export const getProductById = async (id, path) => {
    try {


        if (!id) {
              throw new BadRequest ("No se ingresó un ID válido") ;
         }
        const idProduct = parseInt(id, 10);
        const products = await handleFileOperation(path)

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