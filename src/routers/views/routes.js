/* eslint-disable no-unused-vars */
import { Router } from 'express';

export const router = Router();

// agregar middelware de autentication, si quiere entrar a home, tiene que estar logeado, de cado contrario enviar a la pagina de login

router.get('/', async (req, res, next) => {
  try {
    const response = await fetch('http://localhost:8080/api/products');
    const { data } = await response.json();

    const carrito = req.cookies.carrito || [];
    if (carrito.length > 0) {
      return res.render('home', {
        title: 'Lista de Productos',
        payload,
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
        products: data,
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

router.get('/auth/verify', async (req, res, next) => {
  try {
    res.render('verifyRegister', {
      title: 'Registro Exitoso!',
    });
  } catch (error) {
    next('Error al cargar el registro');
  }
});

router.get('/auth/verify-user', async (req, res, next) => {
  try {
    res.render('verifyUser', {
      title: 'Verificacion de usuario',
    });
  } catch (error) {
    next('Error al cargar el registro');
  }
});

router.get('/carts/:cid?', async (req, res, next) => {
  try {
    const cid = req.params.cid || '67670b7e72fd3b14db0d0606';
    const products = await fetch(`http://localhost:8080/api/carts/${cid}`);

    const cartsData = await products.json();

    const productLista = cartsData.data.product;

    res.render('carts', {
      title: 'Productos del carrito',
      products: cartsData.data.product || [],
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
