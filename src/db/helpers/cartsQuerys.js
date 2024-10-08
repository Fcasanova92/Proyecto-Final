
import { BadRequest } from '../../errors/badRequest.js';
import { InternalServerError } from '../../errors/internalServerError.js';
import { cartModel } from '../../models/carts.js';
import { getProductByIdFromDb } from './productQuerys.js';

export const addCartInDb = async (cart) => {
    try {
        await cartModel.create(cart)
        return { message: `Se logró crear correctamente el carrito.` };
    } catch (error) {

        throw new InternalServerError(error.message)
    }
};

export const addProductInCartIntoDb = async (cid,cart) => {
    try {
        await cartModel.findOneAndUpdate({cid},cart, {

            new: true
        })

        return { message: `Se logró agregar correctamente el el producto al carrito` };
    } catch (error) {

        throw new InternalServerError(error.message)
    }
};

export const getAllCartsFromDb = async () => {
    try {
        const carts = await cartModel.find()
        return carts
   

    } catch (error) {
        throw new InternalServerError(error.message)
    }
};

export const getCartByIdFromDb = async (id) => {
    try {

        if (!id) {
              throw new BadRequest ("No se ingresó un ID válido") ;
         }

        const cart = await cartModel.findOne({cid:id}).lean()

        if (!cart) {
            throw new BadRequest(`No existe el carrito con id: ${id}`)
        }
        return cart;
    } catch (error) {
        if(error instanceof BadRequest){
            throw error
        }
        throw new InternalServerError(error)
   
    }
};

export const deleteCartFromDb = async (id) => {
    
    try {
        await cartModel.deleteOne({cid:id})
        return { message: `Se logró eliminar correctamente el carrito.` };
    } catch (error) {

        throw new InternalServerError(error.message)
    }
};

export const deleteProductInCartFromDB = async (pid, cid) => {
    
    try {

        const productById = await getProductByIdFromDb(pid)

        await cart.updateOne(
            { cid: cid }, // Encuentra el carrito por su id
            {
              $pull: { products: { idProduct: productById._id } } // Elimina el producto del array de productos
            }
          );
        return { message: `Se logró eliminar correctamente el producto.` };
    } catch (error) {

        throw new InternalServerError(error.message)
    }
};


export const updateQuatityInProductInCartFromDb = async (cid,cart) => {
    try {
        await cartModel.findOneAndUpdate({cid},cart, {

            new: true
        })

        return { message: `Se logró aumentar la cantidad del producto en el carrito` };
    } catch (error) {

        throw new InternalServerError(error.message)
    }
};