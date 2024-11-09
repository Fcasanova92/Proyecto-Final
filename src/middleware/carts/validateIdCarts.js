import { getCartByIdFromDb } from "../../db/querys/cartsQuerys.js";
import { BadRequest, NotFound } from "../../utils/errors.js";

export const validateCartsId = async (req, res, next) => {
    const { cid } = req.params;
    
    if (isNaN(cid)) {

        throw new NotFound("El ID del carrito proporcionado no es válido")
    }
    try {
        const cart = await getCartByIdFromDb(parseInt(cid));
        
        if (!cart) {
            throw new BadRequest("El ID del carrito proporcionado no es válido")
        }
        next();
    } catch (error) {
        next(error); 
    }
};