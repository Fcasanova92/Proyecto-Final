// TODO ESTA FUNCION ACTUALIZA EL LA CANTIDAD DE PRODUCTOS DE UI DEL CARRITO
import { showMessageEmptyProduct } from './showEmptyProductMesasge.js';

export const updateCartQuantity = async () => {
  try {
    const quantityElement = document.querySelector('.quantityProductInCart');

    const cid = quantityElement.getAttribute('data-id') || 6;

    // enviar el cid si el usuario esta logeado, va a permitar cargar dinamicamente, se puede obtener de
    // alguna cookie que se almacende solamente el cid del carrito

    const response = await fetch(`http://localhost:8080/api/carts/${cid}`);

    if (response.status === 404) {
      showMessageEmptyProduct();
    }

    if (response.ok) {
      const data = await response.json();

      quantityElement.textContent = data.products.length;

      const quantityElementNumber = parseInt(quantityElement.textContent);

      if (quantityElementNumber === 0) {
        // SI LA DATA ES CERO, AL MOMENTO DE INGRESAR AL CARRITO, SE MOSTRARA EL MENSAJE DE
        // QUE NO HAY PRODUCTOS
        showMessageEmptyProduct();
      }
    }
  } catch (error) {
    console.warn(error);
  }
};
