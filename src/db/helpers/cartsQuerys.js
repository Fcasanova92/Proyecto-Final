
import { BadRequest } from '../../errors/badRequest.js';
import { InternalServerError } from '../../errors/internalServerError.js';
import { handleFileOperation } from './fs.js';



export const saveCart = async (cart, path, action) => {
    try {
        await handleFileOperation(path, cart);
        return { message: `Se logró ${action} correctamente el carrito.` };
    } catch (error) {
        throw new InternalServerError(error.message);
    }
};


export const saveProductInCart = async (cart, path, action) => {
    try {
        await handleFileOperation(path, cart);
        return { message: `Se logró ${action} correctamente el producto al carrito` };
    } catch (error) {
        throw new InternalServerError(error.message);
    }
};


export const getAllCarts = async (path) => {
    try {
        return await handleFileOperation(path);
    } catch (error) {
        throw new InternalServerError(error.message);
    }
};


export const getCartById = async (id, path) => {
    try {
        if (!id) {
            throw new BadRequest("No se ingresó un ID válido");
        }
        const idCart = parseInt(id);
        const carts = await handleFileOperation(path);
        const cart = carts.find(cart => cart.id === idCart);

        if (!cart) {
            throw new BadRequest(`No existe el carrito con id: ${id}`);
        }

        return cart;
    } catch (error) {
        if (error instanceof BadRequest) {
            throw error;
        }
        throw new InternalServerError(error.message);
    }
};