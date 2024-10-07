
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

export const getProductsFromDbWithFilter = async (limit, page, query, sort) => {


    try {
        const filter = query ? { title: { $regex: query, $options: 'i' } } : {};

    let sortCriteria = {};
    if (sort) {
      if (sort === 'asc') {
        sortCriteria = { pid: 1 }; 
      } else if (sort === 'desc') {
        sortCriteria = { pid: -1 }; 
      }
    }

    const totalProducts = await productModel.countDocuments(filter);

    const totalPages = Math.ceil(totalProducts / limitNumber);

    if (pageNumber > totalPages && totalPages > 0) {

        throw new BadRequest("pagina no encontrada")
    }

    const products = await productModel.find(filter)
      .sort(sortCriteria) 
      .skip((pageNumber - 1) * limitNumber) 
      .limit(limitNumber); 

    const hasPrevPage = pageNumber > 1;
    const hasNextPage = pageNumber < totalPages;
    const prevPage = hasPrevPage ? pageNumber - 1 : null;
    const nextPage = hasNextPage ? pageNumber + 1 : null;

    const baseUrl = `${req.protocol}://${req.get('host')}${req.path}`;
    const prevLink = hasPrevPage ? `${baseUrl}?page=${prevPage}&limit=${limitNumber}` : null;
    const nextLink = hasNextPage ? `${baseUrl}?page=${nextPage}&limit=${limitNumber}` : null;

    return {
      status: 'success',
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page: pageNumber,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    };

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