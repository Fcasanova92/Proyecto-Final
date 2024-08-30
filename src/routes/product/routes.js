import { Router } from "express";
import { ProductManager } from '../../productManager.js'

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
router.post("/", (req, res) => {
    res.send('Producto agregado');
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
    res.send('Producto con ID ' + req.params.pid + ' actualizado');
});

// Borrar un producto
router.delete("/:pid", (req, res) => {
    res.send('Producto con ID ' + req.params.pid + ' eliminado');
});