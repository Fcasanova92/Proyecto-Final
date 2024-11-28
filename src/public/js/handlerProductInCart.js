import { updateCartQuantity } from './updateCartQuantity.js';

export const handlerProductInCart = async ({ target }) => {
  const idProduct = target.dataset.id;

  // aca tambien tengo que enviarle el cid del carrito para actualizar los productos del carrito
  const response = await fetch(`/api/carts/1/products/${idProduct}`, {
    method: 'PATCH',
  });

  if (response.ok) {
    const data = await response.json();
    await updateCartQuantity();
    alert(data.message);
  } else {
    console.error('Error en la actualización del carrito');
  }
};
