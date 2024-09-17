const socket = io();

// Función para actualizar la lista de productos en la vista
function updateProductList(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ''; // Limpiar la lista actual
  console.log(products.product)
  products.product.forEach(product => {
    const li = document.createElement('li');
    li.innerHTML = `${product.name} - $${product.price} <button data-id="${product.id}" class="delete-btn">Eliminar</button>`;
    productList.appendChild(li);
  });

  // Agregar eventos a los botones de eliminar
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const productId = button.getAttribute('data-id');
      try {
        await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    });
  });
}

// Escuchar eventos de `Socket.io` para actualizar la lista de productos
socket.on('products', updateProductList);

// Inicializar la lista de productos cuando se carga la página
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/products');
    const products = await response.json();
    updateProductList(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }
});