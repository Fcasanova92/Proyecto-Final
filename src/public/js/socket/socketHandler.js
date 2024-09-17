import { deleteProductBySocket } from "../deleteProductBySocket.js";
import { getProducts } from "../getProducts.js";

export default (io) => {

    io.on('connection', async (socket) => {
      console.log('Cliente conectado');

      const products = await getProducts()
      // Enviar productos al conectarse
      socket.emit('products', products);
  
  
      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
      });
    });
  };