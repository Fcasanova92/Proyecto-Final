import { updateCartQuantity } from './updateCartQuantity.js';

import { showMessageEmptyProduct } from './showEmptyProductMesasge.js';

// ESTA FUNCION SE ENCARGA DE BORRAR TANTO EN LA UI COMO EN LA BASE DE DATOS LOS PRODUCTOS EN EL CARRITO
export const deleteProducInCart = async (e) => {
  e.preventDefault();

  const idProductToDelete = e.currentTarget.getAttribute('data-id');

  const itemProduct = document.querySelector(
    `li.product-item[id="${idProductToDelete}"]`
  );

  const quantityElement = document.querySelector('.quantityProductInCart');

  // aca tambien tengo que enviarle el cid del carrito para actualizar los productos del carrito

  const response = await fetch(`/api/carts/1/products/${idProductToDelete}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    const data = await response.json();

    await updateCartQuantity();

    itemProduct.remove();

    const quantityElementNumber = parseInt(quantityElement.textContent);

    if (quantityElementNumber === 0) {
      // SI LA DATA ES CERO, AL MOMENTO DE INGRESAR AL CARRITO, SE MOSTRARA EL MENSAJE DE
      // QUE NO HAY PRODUCTOS
      showMessageEmptyProduct();
    }

    alert(data.message);
  } else {
    console.error('Error al obtener los productos del carrito.');
  }
};
