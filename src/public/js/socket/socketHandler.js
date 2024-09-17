export default (io) => {
  io.on('connection', async (socket) => {
    console.log('Usuario conectado');

    try {
      const response = await fetch('http://localhost:8080/api/products/');
      if (!response.ok) throw new Error('Error al obtener los productos');

      const data = await response.json();
      const products = data.products;

      socket.emit("products-update", products); // Emitir la lista de productos al cliente
    } catch (error) {
      console.error('Error al emitir productos:', error.message);
      socket.emit("products-update", []); // Enviar lista vacía si hay error
    }

    socket.on('disconnect', () => {
      console.log('Usuario desconectado');
    });
  });
};