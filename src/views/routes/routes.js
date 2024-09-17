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

const products = await getProducts(); // Cargar productos desde el archivo JSON o base de datos

  res.render('realTimeProducts', {
    title: "Lista de Productos en Tiempo Real",
    products: products // Productos iniciales para Handlebars
  });
});

