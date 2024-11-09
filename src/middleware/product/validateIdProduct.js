import { getProductByIdFromDb } from "../../db/querys/productQuerys.js";


export const validateProductId = async (req, res, next) => {
    const { pid } = req.params;
    
    if (isNaN(pid)) {
        return res.status(400).json({message:"El ID del producto proporcionado no es válido"})
    }
    try {
        const product = await getProductByIdFromDb(parseInt(pid));
        
        if (!product) {
            return res.status(404).json({message:`Producto con ID ${pid} no encontrado.`})
        }
        next();
    } catch (error) {
        next(error); 
    }
};