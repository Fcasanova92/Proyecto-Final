import fs from 'fs';
import { BadRequest } from '../../errors/badRequest.js';
import { InternalServerError } from '../../errors/internalServerError.js';

export const saveCart = async (cart, path, action) => {
    try {
        await fs.promises.access(`${path}/db/carts.json`).catch(async () => {
            await fs.promises.writeFile(`${path}/db/carts.json`, JSON.stringify([], null, 2));
        });
        await fs.promises.writeFile(`${path}/db/carts.json`, JSON.stringify(cart, null, 2));
        return { message: `Se logró ${action} correctamente el carrito.` };
    } catch (error) {

        throw new InternalServerError(error.message)
    }
};

export const saveProductInCart = async (cart, path, action) => {
    try {
        await fs.promises.access(`${path}/db/carts.json`).catch(async () => {
            await fs.promises.writeFile(`${path}/db/carts.json`, JSON.stringify([], null, 2));
        });
        await fs.promises.writeFile(`${path}/db/carts.json`, JSON.stringify(cart, null, 2));

        return { message: `Se logró ${action} correctamente el el producto al carrito` };
    } catch (error) {

        throw new InternalServerError(error.message)
    }
};

export const getAllCarts = async (path) => {
    try {
        const productJson = JSON.parse(await fs.promises.readFile(`${path}/db/carts.json`, "utf-8"));
        return productJson
   

    } catch (error) {
        throw new InternalServerError(error.message)
    }
};

export const getCartById = async (id, path) => {
    try {


        if (!id) {
              throw new BadRequest ("No se ingresó un ID válido") ;
         }
        const idCart= parseInt(id);
        const carts = JSON.parse(await fs.promises.readFile(`${path}/db/carts.json`, "utf-8"));

        const cart = carts.find(cart => cart.id === idCart);
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