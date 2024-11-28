import { Router } from 'express';

export const router = Router();

// agregar middelware de autentication, si quiere entrar a home, tiene que estar logeado, de cado contrario enviar a la pagina de login

router.get('/', async (req, res, next) => {
  try {
    const products = await fetch('http://localhost:8080/api/products');
    const productsData = await products.json();

    res.render('home', {
      title: 'Lista de Productos',
      products: productsData.products,
    });
  } catch (error) {
    res.status(500).send('Error al cargar productos');
  }
});

router.get('/auth/login', async (req, res, next) => {
  try {
    res.render('login', {
      title: 'Login',
    });
  } catch (error) {
    res.status(500).send('Error al cargar el login');
  }
});

router.get('/auth/register', async (req, res, next) => {
  try {
    res.render('register', {
      title: 'Register',
    });
  } catch (error) {
    res.status(500).send('Error al cargar el registro');
  }
});

router.get('/carts/:cid?', async (req, res, next) => {
  try {
    const cid = req.params.cid || 1;
    const products = await fetch(`http://localhost:8080/api/carts/${cid}`);
    const cartsData = await products.json();

    res.render('carts', {
      title: 'Productos del carrito',
      products: cartsData.products,
      cid: cid,
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
      title: 'Lista de Productos en Tiempo Real',
      products: productsData.products,
    });
  } catch (error) {
    res.status(500).send('Error al cargar productos');
  }
});
