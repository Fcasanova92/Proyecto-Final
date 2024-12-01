/* eslint-disable no-unused-vars */
import { Router } from 'express';

export const router = Router();

// agregar middelware de autentication, si quiere entrar a home, tiene que estar logeado, de cado contrario enviar a la pagina de login

router.get('/', async (req, res, next) => {
  try {
    const products = await fetch('http://localhost:8080/api/products');
    const productsData = await products.json();
    const carrito = req.cookies.carrito || [];
    if (carrito.length > 0) {
      return res.render('home', {
        title: 'Lista de Productos',
        products,
      });
    }

    // Crear la cookie si no existe
    res
      .cookie('carrito', carrito, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      })
      .render('home', {
        title: 'Lista de Productos',
        products,
      });
  } catch (error) {
    next('Error al cargar productos');
  }
});

router.get('/auth/login', async (req, res, next) => {
  try {
    res.render('login', {
      title: 'Login',
    });
  } catch (error) {
    next('Error al cargar el login');
  }
});

router.get('/auth/register', async (req, res, next) => {
  try {
    res.render('register', {
      title: 'Register',
    });
  } catch (error) {
    next('Error al cargar el registro');
  }
});

router.get('/carts/:cid?', async (req, res, next) => {
  try {
    const cid = req.params.cid || 1;
    const products = await fetch(`http://localhost:8080/api/carts/${cid}`);
    const cartsData = await products.json();
    res.render('carts', {
      title: 'Productos del carrito',
      products: cartsData.products || [],
      cid: cid,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/realtimeproducts', async (req, res, next) => {
  try {
    const products = await fetch('http://localhost:8080/api/products');
    const productsData = await products.json();

    res.render('realTimeProducts', {
      title: 'Lista de Productos en Tiempo Real',
      products: productsData.products,
    });
  } catch (error) {
    next(error);
  }
});
