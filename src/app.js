import express from 'express'
import { CartsRouter, ProductRouter } from "./routes/index.js";
import handlebars from "express-handlebars"
import {__dirname, mongooseConnect} from "./utils.js"
import { ViewsRouter } from './views/routes/index.js';
// import { Server } from 'socket.io';
// import socketHandler from './public/js/socket/socketHandler.js';
import { PORT } from './env.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { errorHandler } from './middleware/error/errorHandler.js';


const app = express();

mongooseConnect();

// const httpServer = app.listen(PORT, ()=>{ console.log(`http://localhost:${PORT}/`);})

app.listen(PORT, ()=>{ console.log(`http://localhost:${PORT}/`);})

// const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine());

app.set('views', __dirname + '/views');

app.set('view engine','handlebars');

app.use(express.static(__dirname + '/public'))

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(cookieParser())

app.use(morgan('dev'));

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/views', ViewsRouter);

app.use("/api/products", ProductRouter);

app.use("/api/carts", CartsRouter);

app.use(errorHandler());

// socketHandler(io);


