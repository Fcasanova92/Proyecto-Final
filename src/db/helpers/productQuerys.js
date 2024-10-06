
import { BadRequest } from '../../errors/badRequest.js';
import { InternalServerError } from '../../errors/internalServerError.js';
import { productModel } from '../../models/product.js';

export const addProductToDb = async (product) => {
    
    try {
        await productModel.create(product)
        return { message: `Se logró guardar correctamente el producto.` };
    } catch (error) {

        throw new InternalServerError(error.message)
    }
};

export const getAllProductFromDb = async () => {

    try {
        const products = await productModel.find()
       
        return products;

    } catch (error) {
        throw new InternalServerError(error.message)
    }
};

export const getProductsFromDbWithFilter = async (limit) => {

    // agregar todas las condiciones que faltan
    try {
        const products = await productModel.find()
        if(limit){
            const productWithLimit = products.length <= limit ? products : products.slice(0, limit);
            return productWithLimit;
        }
        return products;

    } catch (error) {
        throw new InternalServerError(error.message)
    }
};

export const getProductByIdFromDb = async (id) => {
    try {

        if (!id) {
              throw new BadRequest ("No se ingresó un ID válido") ;
         }

        const product = await productModel.findOne({pid:id}).lean()

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


export const updateProductToDb = async (id, product) => {
    
    try {
        await productModel.updateOne({pid:id},product)
        return { message: `Se logró actualizar correctamente el producto.` };
    } catch (error) {

        throw new InternalServerError(error.message)
    }
};


export const deleteProductFromDb = async (id) => {
    
    try {
        await productModel.deleteOne({pid:id})
        return { message: `Se logró eliminar correctamente el producto.` };
    } catch (error) {

        throw new InternalServerError(error.message)
    }
};