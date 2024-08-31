import { Router } from "express";
import { CartsManager } from '../../cartsManager.js'

export const router = Router();
const cart = new CartsManager();


router.get("/:cid", async (req, res, next) => {
    try {
        const idCart = parseInt(req.params.cid)
        const carts = await cart.getById(idCart);

        return res.status(200).json({...carts});
 
    } catch (error) {
        next(error)
    }
});

router.post("/", async (req, res, next) => {
    try {
        const createCart = await cart.addCart();
        return res.status(200).json({message:createCart.message});
        
    } catch (error) {
        next(error)
    }
});


router.patch("/:cid/products/:pid", async (req, res, next) => {
    try {
        const idProduct = parseInt(req.params.pid);
   
        const idCart = parseInt(req.params.cid);
 
        const cartUpdate = await cart.addProductToCart(idProduct, idCart);
        
        return res.status(200).json({ message: cartUpdate.message });


    } catch (error) {
        next(error)
    }
});
