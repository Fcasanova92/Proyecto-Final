import { getCartByIdFromDb } from "../../db/querys/cartsQuerys.js";
import { BadRequest, NotFound } from "../../utils/errors.js";

export const validateCartsId = async (req, res, next) => {
    const { cid } = req.params;
    
    if (isNaN(cid)) {

        throw new BadRequest("El ID del carrito proporcionado no tiene un formato válido")
    }
    try {
        const cart = await getCartByIdFromDb(parseInt(cid));
        
        if (!cart) {
            throw new NotFound("El carrito seleccionado no existe")
        }
        next();
    } catch (error) {
        next(error); 
    }
};