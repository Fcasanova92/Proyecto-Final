export const handlerQuantity = async ({ target }) => {
  const idProduct = target.dataset.id;

  const quantity = document.querySelector(`p[data-id='${idProduct}']`);

  let quantityProduct = parseInt(quantity.textContent.split(': ')[1]);

  const idButton = target.id;

  switch (idButton) {
    case 'increase':
      quantityProduct += 1;

      break;

    case 'decrease':
      quantityProduct -= 1;

      break;
  }

  if (quantityProduct < 1) {
    quantity.textContent = 'Cantidad: 1';

    return;
  }

  quantity.textContent = `Cantidad: ${quantityProduct}`;

  // aca tambien tengo que enviarle el cid del carrito para actualizar los productos del carrito

  const response = await fetch(
    `http://localhost:8080/api/carts/67670b7e72fd3b14db0d0606/products/${idProduct}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: quantityProduct,
      }),
    }
  );

  if (response.ok) {
    await response.json();

    alert('Se modifico la cantidad del producto');
  }
};
