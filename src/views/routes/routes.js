import { Router } from "express";
import { getProducts } from "../../public/js/getProducts.js";

export const router = Router();

router.get("/", async (req, res, next) => {

    const product = await getProducts()

    res.render('home', {
        title:"Lista de Productos",
        product:product})
   
});

router.get("/realtimeproducts", async (req, res, next) => {
    const io = req.io
    const product = await getProducts()
    io.emit("product", product)
    res.render('realTimeProducts', {
        title:"Lista de Productos",
        product:product})
   
});

