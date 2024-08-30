import { Router } from "express";
import { ProductManager } from '../../productManager.js'
;

export const router = Router()

const product = new ProductManager();

// obtener todos los productos
// Obtener todos los productos
router.get("/", async (req, res) => {
    try {
        const products = await product.getAll()

        res.status(200).json({products})
    
    } catch (error) {
    
        res.status(404).json({message:error.message})
    }
});

// Agregar un producto
router.post("/", async (req, res) => {
    try {

        const data = req.body;

        const createProduct = await product.addProduct(data);

        if(createProduct.status){

            res.status(200).json({message:createProduct.message});

        }else {
            res.status(404).json({ message: "Error al crear el producto" });
        }
        
    } catch (error) {
        
        res.status(500).json({message:error.message})
    }
});

// Obtener un producto por id
router.get("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);

    try {
        const productById = await product.getById(id);
        
        res.status(200).json(productById);
    
    } catch (error) {

        res.status(404).json({ message: error.message }); // Usa error.message para obtener el mensaje del error
    }
})

// Actualizar un producto
router.patch("/:pid", (req, res) => {

    try {

    const id = parseInt(req.params.pid);
    const updateData = req.body;

    const prodUpdate = product.updateProduct(id, updateData);

    if(prodUpdate.status){

        res.status(200).json({message:prodUpdate.message});

    }else {
        res.status(404).json({ message: "Error al actualizar el producto" });
    }
        
    } catch (error) {

        res.status(500).json({message:error.message})
        
    }

});

// Borrar un producto
router.delete("/:pid", (req, res) => {

    try {

        const id = parseInt(req.params.pid);

        const prodDelete = product.deleteProduct(id);

        if(prodDelete.status){

            res.status(200).json({message:prodDelete.message});
    
        }else {
            res.status(404).json({ message: "Error al eliminar el producto" });
        }
        
        
    } catch (error) {

        res.status(500).json({message:error.message})
        
    }
   
    
});