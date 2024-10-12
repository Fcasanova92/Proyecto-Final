import { Router } from "express";

export const router = Router();

router.get("/", async (req, res, next) => {

  try {
    const products = await fetch('http://localhost:8080/api/products');
    const productsData = await products.json();

    res.render('home', {
      title: "Lista de Productos",
      products: productsData.products
    });
  } catch (error) {
    res.status(500).send('Error al cargar productos');
  }
   
});

router.get("/carts/:cid?", async (req, res, next) => {

  try {
   
    const cid = req.params.cid || 1
    const products = await fetch(`http://localhost:8080/api/carts/${cid}`);
    const cartsData = await products.json();

    res.render('carts', {
      title:"Productos del carrito",
      products: cartsData.products,
      cid:cid
    });
  } catch (error) {
    res.status(500).send('Error al cargar productos');
  }
   
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await fetch('http://localhost:8080/api/products');
    const productsData = await products.json();

    res.render('realTimeProducts', {
      title: "Lista de Productos en Tiempo Real",
      products: productsData.products
    });
  } catch (error) {
    res.status(500).send('Error al cargar productos');
  }
});
