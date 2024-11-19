import {InternalServerError} from '../../utils/errors.js'
import { productModel } from '../../models/product.js';

export const saveUserInDb = async (product) => {
    try {
        const newProduct = await productModel.create(product);
        if(newProduct){
            return { message: "Producto guardado correctamente." };
        }
    } catch (error) {
        throw new InternalServerError(`Error de base de datos al guardar el producto: ${error.message}`);
    }
};

export const getAllUserFromDb = async () => {
    try {
        const products = await productModel.find().lean();
        return products;
    } catch (error) {
        throw new InternalServerError(`Error de base de datos al obtener productos: ${error.message}`);
    }
};


export const getUserByEmail = async (email) => {
    try {
        const product = await productModel.findOne({ email: email }).lean();
        return product;
    } catch (error) {
        throw new InternalServerError(`Error de base de datos al obtener producto con ID ${id}: ${error.message}`);
    }
};

export const updateUserInDb = async (id, user) => {
    try {
        await productModel.updateOne({ pid: id }, user);
        return { message: "Producto actualizado correctamente." };
    } catch (error) {
        throw new InternalServerError(`Error de base de datos al actualizar producto con ID ${id}: ${error.message}`);
    }
};

export const deleteUserFromDb = async (id) => {
    try {
        await productModel.deleteOne({ pid: id });
        return { message: "Producto eliminado correctamente." };
    } catch (error) {
        throw new InternalServerError(`Error de base de datos al eliminar producto con ID ${id}: ${error.message}`);
    }
};