export default (io) => {

  io.on('connection', async (socket) => {
    console.log('Cliente conectado');

    try {
      const response = await fetch('http://localhost:8080/api/products/');
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data); // This will log the whole data object
      socket.emit('products', data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      socket.emit('error', 'Failed to fetch products');
    }

  });

};