const socket = io();

socket.emit('message', 'hola te estoy mandando mensaje desde el cliente')