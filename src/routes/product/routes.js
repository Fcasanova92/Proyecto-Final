import { Router } from "express";
import { ProductManager } from '../../productManager.js'

export const router = Router();
const product = new ProductManager();


router.get("/", async (req, res, next) => {
    try {
  
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const query = req.query.query || "";
        const sort = req.query.sort || "desc";
        const products = await product.getAll(limit, page, query, sort);

        if (products.payload.length === 0) {
   
            return res.status(404).json({ products ,message:"No existen productos" });
        }

        return res.status(200).json({ products });
    } catch (error) {
        next(error); 
    }
});

router.post("/", async (req, res, next) => {
    try {
        const data = req.body;
        const createProduct = await product.addProduct(data);
        return res.status(200).json({message:createProduct.message});
        
    } catch (error) {
        next(error)
    }
});


router.get("/:pid", async (req, res, next) => {
    const id = parseInt(req.params.pid);

    try {
        const productById = await product.getById(id);

        return res.status(200).json({...productById});

    } catch (error) {

        next(error)
    }
});


router.patch("/:pid", async (req, res, next) => {
    try {
        const id = parseInt(req.params.pid);
        const updateData = req.body;
        const prodUpdate = await product.updateProduct(id, updateData);
        
        return res.status(200).json({ message: prodUpdate.message });


    } catch (error) {
        next(error)
    }
});


router.delete("/:pid", async (req, res, next) => {
    try {
        const id = parseInt(req.params.pid);
        const prodDelete = await product.deleteProduct(id);
        return res.status(200).json({ message: prodDelete.message });
  
    } catch (error) {
        next(error)
    }
});