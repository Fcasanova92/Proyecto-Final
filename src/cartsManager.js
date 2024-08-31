
import {dirname} from "path"
import { fileURLToPath } from "url";
import { getAllCarts, getCartById, saveCart, saveProductInCart } from "./db/helpers/cartsQuerys.js";
import { getProductById } from "./db/helpers/productQuerys.js";

export class CartsManager {

    constructor(){

        this.path = dirname(fileURLToPath(import.meta.url))

    }
    async addCart() {
        try {

            const allCarts = await getAllCarts(this.path);
    
            const ids = allCarts.map((cart) => cart.id);

            const lastIdCart = ids.length > 0 ? Math.max(...ids) : 0;
            const cartId = lastIdCart + 1;

            const newCart = { id: cartId, products:[] };
   
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
