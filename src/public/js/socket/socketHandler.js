import { deleteProductBySocket } from "../deleteProductBySocket.js";
import { getProducts } from "../getProducts.js";

export default (io) => {

    io.on('connection', async (socket) => {
      console.log('Cliente conectado');

      const products = await getProducts()
      // Enviar productos al conectarse
      socket.emit('products', products);
  
      // Escuchar el evento de eliminar producto
      socket.on('delete', async (productId) => {
        const pid = parseInt(productId)
        await deleteProductBySocket(pid)
        const updateProducts = await getProducts()
        io.emit('products', updateProducts); // Emitir la lista actualizada a todos los clientes
      });
  
      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
      });
    });
  };