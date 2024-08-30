import { Router } from "express";
import { ProductManager } from '../../productManager.js'
;

export const router = Router()

const product = new ProductManager();

// obtener todos los productos
// obtener todos los productos
router.get("/", async (req, res) => {
    try {
        const products = await product.getAll()

        if(products.status){

            res.status(200).json(products)
        }

        res.status(404).json(products.message)
    
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

            res.status(200).json(createProduct.message);

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

        if(productById.status){

            res.status(200).json(productById.product);
        }
        
        res.status(404).json(productById.message);
    
    } catch (error) {

        res.status(404).json({ message: error.message }); // Usa error.message para obtener el mensaje del error
    }
})

// Actualizar un producto
router.patch("/:pid", async (req, res) => {

    try {

    const id = parseInt(req.params.pid);
    const updateData = req.body;

    const prodUpdate = await product.updateProduct(id, updateData);

    console.log(prodUpdate)

    if(prodUpdate.status){

        res.status(200).json({message:prodUpdate.message});

    }
    res.status(404).json({ message: prodUpdate.message});

        
    } catch (error) {

        res.status(500).json({message:error.message})
        
    }

});

// Borrar un producto
router.delete("/:pid", async (req, res) => {

    try {

        const id = parseInt(req.params.pid);

        const prodDelete = await product.deleteProduct(id);

        if(prodDelete.status){

            console.log(prodDelete.message)

            res.status(200).json({message:prodDelete.message});
    
        }
        
        res.status(404).json({ message: "No se pudo eliminar el producto" });
        
        
        
    } catch (error) {

        res.status(500).json({message:error.message})
        
    }
   
    
});