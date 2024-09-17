export default (io) => {

  io.on('connection', async (socket) => {
    console.log('Cliente conectado');

    try {
      const response = await fetch('http://localhost:8080/api/products/');
      const data = await response.json();
      if(data.products === 0){
        if (!response.ok) {
          throw new Error(data.message);
        }
      }
      socket.emit('products', data.products);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      socket.emit('error', error.message);
    }

  });

};