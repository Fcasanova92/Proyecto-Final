import {__dirname} from "./utils.js"
import { getAllCartsFromDb, addCartInDb, addProductInCartIntoDb, getCartByIdFromDb } from "./db/helpers/cartsQuerys.js";
import {getProductByIdFromDb } from "./db/helpers/productQuerys.js";

export class CartsManager {

    constructor(){

        this.path = __dirname;

    }
    async addCart() {
        try {

            const allCarts = await getAllCartsFromDb(this.path);
    
            const ids = allCarts.map((cart) => cart.cid);

            const lastIdCart = ids.length > 0 ? Math.max(...ids) : 0;
            const cartId = lastIdCart + 1;

            const newCart = { cid: cartId, products:[] };
   
            allCarts.push(newCart);

            return await addCartInDb(allCarts, this.path, "crear");

        } catch (error) {

            throw error
        }
    }

    async getById(id) {
        try {
            const carts = await getCartByIdFromDb(id, this.path);
            return carts;
        } catch (error) {

            throw error
        }
    }

    async addProductToCart(pid, cid) {
        try {
            const cartById = await getCartByIdFromDb(cid);
            const productById = await getProductByIdFromDb(pid);
    
            const productInCart = cartById.products.find((prod) => prod.idProduct.toString() === productById._id.toString());
    
            if (productInCart) {
        
                productInCart.quantity += 1;
            } else {
    
                const newProduct = { idProduct: productById._id, quantity: 1 };
                cartById.products.push(newProduct);
            }
    
            return await addProductInCartIntoDb(cid, cartById);
        } catch (error) {
            throw error;
        }
    }
}
