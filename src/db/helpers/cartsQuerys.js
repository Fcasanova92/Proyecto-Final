
import { BadRequest } from '../../errors/badRequest.js';
import { InternalServerError } from '../../errors/internalServerError.js';
import { cartModel } from '../../models/carts.js';

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