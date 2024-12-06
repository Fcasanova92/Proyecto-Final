import { updateCartQuantity } from './updateCartQuantity.js';

export const handlerProductInCart = async ({ target }) => {
  const idProduct = target.dataset.id;
  console.log("entro en la funcion")

  // aca tambien tengo que enviarle el cid del carrito para actualizar los productos del carrito
  try {
    await fetch(`http://localhost:8080/api/carts/1/products/${idProduct}`, {
      method: 'PATCH',
    });
  } catch (error) {
    console.log('estro en el catch', error);
  }
  // const response = await fetch(
  //   `http://localhost:8080/api/carts/1/products/${idProduct}`,
  //   {
  //     method: 'PATCH',
  //   }
  // );

  // if (response.ok) {
  //   const data = await response.json();
  //   await updateCartQuantity();
  //   alert(data.message);
  // } else {
  //   console.error('Error en la actualización del carrito');
  // }
};
