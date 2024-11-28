// TODO ESTA FUNCION ACTUALIZA EL LA CANTIDAD DE PRODUCTOS DE UI DEL CARRITO
import { showMessageEmptyProduct } from './showEmptyProductMesasge.js';

export const updateCartQuantity = async () => {
  const quantityElement = document.querySelector('.quantityProductInCart');

  const cid = quantityElement.getAttribute('data-id') || 1;

  // enviar el cid si el usuario esta logeado, va a permitar cargar dinamicamente, se puede obtener de
  // alguna cookie que se almacende solamente el cid del carrito

  const response = await fetch(`/api/carts/${cid}`);

  if (response.ok) {
    const data = await response.json();

    quantityElement.textContent = data.products.length;

    const quantityElementNumber = parseInt(quantityElement.textContent);

    if (quantityElementNumber === 0) {
      // SI LA DATA ES CERO, AL MOMENTO DE INGRESAR AL CARRITO, SE MOSTRARA EL MENSAJE DE
      // QUE NO HAY PRODUCTOS
      showMessageEmptyProduct();
    }
  } else {
    console.log('Error al obtener los productos del carrito.');
  }
};
