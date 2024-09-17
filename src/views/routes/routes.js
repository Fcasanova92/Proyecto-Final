import { Router } from "express";

export const router = Router();

router.get("/", async (req, res, next) => {

    const product = await fetch("http://localhost:8080/api/products")

    res.render('home', {
        title:"Lista de Productos",
        product:product.json()})
   
});

router.get("/realtimeproducts", async (req, res, next) => {

  const products = await fetch("http://localhost:8080/api/products") // Cargar productos desde el archivo JSON o base de datos

  res.render('realTimeProducts', {
    title: "Lista de Productos en Tiempo Real",
    products: products.json() // Productos iniciales para Handlebars
  });
});

