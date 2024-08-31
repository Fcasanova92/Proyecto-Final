
import {dirname} from "path"
import { fileURLToPath } from "url";
import { BadRequest } from "./errors/badRequest.js";
import { getAllCarts, getCartById, saveCart, saveProductInCart } from "./db/helpers/cartsQuerys.js";
import { getProductById } from "./db/helpers/productQuerys.js";

export class CartsManager {

    constructor(){

        this.path = dirname(fileURLToPath(import.meta.url))

    }
    async addCart(carts) {
        try {
            const cartKey = Object.keys(carts);
            
            if (!cartKey.includes('products')) {
                   throw new BadRequest(`El campo products es obligatorio.`);
                }


            if(!Array.isArray(carts.products)){
                    throw new BadRequest(`El campo products debe de ser un array vacio.`);
                   }

            if(carts.products.length !== 0){

                throw new BadRequest(`El campo products debe estar vacio.`);
            }
            

            const allCarts = await getAllCarts(this.path);
    
            const ids = allCarts.map((cart) => cart.id);

            const lastIdCart = ids.length > 0 ? Math.max(...ids) : 0;
            const cartId = lastIdCart + 1;

            const newCart = { id: cartId, ...carts };
   
            allCarts.push(newCart);

            return await saveCart(allCarts, this.path, "crear");

        } catch (error) {

            throw error
        }
    }

    async getById(id) {
        try {
            const carts = await getCartById(id, this.path);
            return carts;
        } catch (error) {

            throw error
        }
    }

    async addProductToCart(idProduct, idCart) {

        try{

            const cartById = await getCartById(idCart, this.path);
            const allCarts = await getAllCarts(this.path)
            const productById = await getProductById(idProduct, this.path)

            const productInCart = cartById.products.find((prod)=>prod.id === idProduct)

            if(productInCart){

                productInCart.quantity+=1

            }else{
                const newProduct = {id:productById.id, quantity:1}
                cartById.products.push(newProduct)
            }

            const updatedCarts = allCarts.map(cart => 
                cart.id === cartById.id ? cartById : cart
            );
    
            // Guardar los carritos actualizados
            await saveProductInCart(updatedCarts, this.path, "agregar");

            return {message: "se agrego correctamente el producto al carrito"}

        } catch (error) {
            throw error
        }
    }

}
