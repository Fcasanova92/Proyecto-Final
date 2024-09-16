const socket = io();

socket.emit('delete', 'hola te estoy mandando mensaje desde el cliente')

socket.on("product", (data)=>{

    console.log(data)
})