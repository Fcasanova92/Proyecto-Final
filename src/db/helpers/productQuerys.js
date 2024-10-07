
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

export const getProductsFromDbWithFilter = async (limit, pages, query, sort) => {
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
      
        const options = {
          pages,        
          limit,          
          sort: sortCriteria,          
          lean: true                 
        };
      
        const result = await productModel.paginate(filter, options);
      
        const { docs: products, totalPages, page, hasNextPage, hasPrevPage, nextPage, prevPage } = result;
      
        const prevLink = hasPrevPage ? `http://localhost:8080/?page=${prevPage}&limit=${limitNumber}` : null;
        const nextLink = hasNextPage ? `http://localhost:8080/?page=${nextPage}&limit=${limitNumber}` : null;
        

        return {
          status: 'success',
          payload: products,
          totalPages,
          prevPage,
          nextPage,
          page,
          hasPrevPage,
          hasNextPage,
          prevLink,
          nextLink,
        };
      
      } catch (error) {
        console.log(error)
        throw new InternalServerError(error.message);
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