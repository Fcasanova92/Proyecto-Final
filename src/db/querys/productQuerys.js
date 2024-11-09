import {InternalServerError} from '../../utils/errors.js'
import { productModel } from '../../models/product.js';

export const addProductToDb = async (product) => {
    try {
        const newProduct = await productModel.create(product);
        if(newProduct){
            return { message: "Producto guardado correctamente." };
        }
    } catch (error) {
        throw new InternalServerError(`Error de base de datos al guardar el producto: ${error.message}`);
    }
};

export const getAllProductsFromDb = async () => {
    try {
        const products = await productModel.find().lean();
        return products;
    } catch (error) {
        throw new InternalServerError(`Error de base de datos al obtener productos: ${error.message}`);
    }
};

export const getProductsFromDbWithFilter = async (limit, page, query, sort) => {
    try {
        const filter = query ? { title: { $regex: query, $options: 'i' } } : {};
        const sortCriteria = sort === 'asc' ? { pid: 1 } : sort === 'desc' ? { pid: -1 } : {};
        const options = { page, limit, sort: sortCriteria, lean: true };

        const result = await productModel.paginate(filter, options);
        const { docs: products, totalPages, hasNextPage, hasPrevPage, nextPage, prevPage } = result;
        
        return {
            status: 'success',
            payload: products,
            totalPages,
            hasNextPage,
            hasPrevPage,
            page,
            prevLink: hasPrevPage ? `http://localhost:8080/?page=${prevPage}&limit=${limit}` : null,
            nextLink: hasNextPage ? `http://localhost:8080/?page=${nextPage}&limit=${limit}` : null,
        };
    } catch (error) {
        throw new InternalServerError(`Error de base de datos al obtener productos con filtro: ${error.message}`);
    }
};

export const getProductByIdFromDb = async (id) => {
    try {
        const product = await productModel.findOne({ pid: id }).lean();
        return product;
    } catch (error) {
        throw new InternalServerError(`Error de base de datos al obtener producto con ID ${id}: ${error.message}`);
    }
};

export const updateProductInDb = async (id, product) => {
    try {
        await productModel.updateOne({ pid: id }, product);
        return { message: "Producto actualizado correctamente." };
    } catch (error) {
        throw new InternalServerError(`Error de base de datos al actualizar producto con ID ${id}: ${error.message}`);
    }
};

export const deleteProductFromDb = async (id) => {
    try {
        await productModel.deleteOne({ pid: id });
        return { message: "Producto eliminado correctamente." };
    } catch (error) {
        throw new InternalServerError(`Error de base de datos al eliminar producto con ID ${id}: ${error.message}`);
    }
};