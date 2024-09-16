import express from 'express'
import { CartsRouter, ProductRouter } from "./routes/index.js";
import { InternalServerError } from './errors/internalServerError.js';
import { BadRequest } from './errors/badRequest.js';
import handlebars from "express-handlebars"
import {__dirname} from "./utils.js"
import { ViewsRouter } from './views/routes/index.js';
import { Server } from 'socket.io';

const PORT = 8080;


const app = express();

const httpServer = app.listen(PORT, ()=>{ console.log(`http://localhost:${PORT}/`);})

const socketServer = new Server(httpServer)

app.engine('handlebars', handlebars.engine());

app.set('views', __dirname + '/views');

app.set('view engine','handlebars');

app.use(express.static(__dirname + '/public'))

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use((req, res, next) => {
    req.io = socketServer;
    next();
});

app.use('/views', ViewsRouter);

app.use("/api/products", ProductRouter);

app.use("/api/carts", CartsRouter);

app.use((err, req, res, next) => {
    if (err instanceof BadRequest) {
        return res.status(400).json({ message: err.message });
    }
    if (err instanceof InternalServerError) {
        return res.status(500).json({ message: err.message });
    }
   
    return res.status(500).json({ message: 'Ha ocurrido un error interno en el servidor.' });
});

socketServer.on('connection', socket => {

    console.log('cliente conectado')

    socket.on('disconnect', () => {

        console.log('Cliente desconectado');
    })
})


