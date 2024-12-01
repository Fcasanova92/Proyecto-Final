import express from 'express';
import {
  CartsRouter,
  ProductRouter,
  SessionRouter,
  UserRouter,
} from './api/index.js';
import { ViewsRouter } from './views/routes/index.js';
import handlebars from 'express-handlebars';
import { mongooseConnect, __dirname } from './utils/mongoose.js';
import path from 'path';
import passport from './middleware/session/passport.js';
// import { Server } from 'socket.io';
// import socketHandler from './public/js/socket/socketHandler.js';
import { PORT } from './utils/env.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { errorHandler } from './middleware/error/errorHandler.js';

const app = express();

mongooseConnect();

// const httpServer = app.listen(PORT, ()=>{ console.log(`http://localhost:${PORT}/`);})

// const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine());

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan('dev'));

app.use(passport.initialize());

// app.use((req, res, next) => {
//     req.io = io;
//     next();
// });

app.use('/', ViewsRouter);

app.use('/api/products', ProductRouter);

app.use('/api/auth', SessionRouter);

app.use('/api/user', UserRouter);

app.use('/api/carts', CartsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

// socketHandler(io);
