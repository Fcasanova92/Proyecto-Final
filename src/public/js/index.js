const socket = io();

// Escuchar la lista de productos desde el servidor y renderizar la tabla
socket.on('products', (products) => {
  const tableBody = document.getElementById('productRows');
  tableBody.innerHTML = ''; // Limpiar la tabla

  // Renderizar cada producto en la tabla
  products.forEach(product => {
    const row = document.createElement('tr');
    row.id = `product-${product.id}`;
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.title}</td>
      <td>${product.description}</td>
      <td>${product.code}</td>
      <td>${product.price}</td>
      <td>${product.stock}</td>
      <td>${product.category}</td>
      <td><button class="btn-delete" data-id="${product.id}">Borrar</button></td>
    `;
    tableBody.appendChild(row);
  });

  // Añadir event listeners a los botones de borrar
  addDeleteListeners();
});

// Función para eliminar un producto al hacer clic en el botón "Borrar"
function addDeleteListeners() {
  const deleteButtons = document.querySelectorAll('.btn-delete');
  deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('data-id');
      socket.emit('delete', productId); // Emitir el evento de eliminación al servidor
    });
  });
}