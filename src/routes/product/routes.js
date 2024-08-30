import { Router } from "express";
import { ProductManager } from '../../productManager.js'
;
import { BadRequest } from "../../errors/badRequest.js";

export const router = Router();
const product = new ProductManager();

// Obtener todos los productos
router.get("/", async (req, res) => {
    try {
        const products = await product.getAll();

        return res.status(200).json({products});
 
    } catch (error) {
        console.log(error.message)
        return res.status(404).json({ message: error.message });
    }
});

// Agregar un producto
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const createProduct = await product.addProduct(data);
        return res.status(200).json({message:createProduct.message});
        
    } catch (error) {
        if(error instanceof BadRequest){
            return res.status(404).json({message:error.message})
        }
        return res.status(500).json({ message: error.message });
    }
});

// Obtener un producto por id
router.get("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);

    try {
        const productById = await product.getById(id);

        return res.status(200).json(productById.product);

    } catch (error) {
        if(error instanceof BadRequest){
            return res.status(404).json({message:error.message})
        }
        return res.status(500).json({ message: error.message });
    }
});

// Actualizar un producto
router.patch("/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const updateData = req.body;
        const prodUpdate = await product.updateProduct(id, updateData);
        
        return res.status(200).json({ message: prodUpdate.message });


    } catch (error) {
        if(error instanceof BadRequest){
            return res.status(404).json({message:error.message})
        }
        return res.status(500).json({ message: error.message });
    }
});

// Borrar un producto
router.delete("/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const prodDelete = await product.deleteProduct(id);
        return res.status(200).json({ message: prodDelete.message });
  
    } catch (error) {
        if(error instanceof BadRequest){
            return res.status(404).json({message:error.message})
        }
        return res.status(500).json({ message: error.message });
    }
});