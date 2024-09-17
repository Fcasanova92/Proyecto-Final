
export default (io) => {

    io.on('connection', async (socket) => {
      console.log('Cliente conectado');

      const products = await fetch('http://localhost:8080/api/products')
      // Enviar productos al conectarse
      socket.emit('products', products.json());
  
    });
  };