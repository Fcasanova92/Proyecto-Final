import express from 'express'
import { CartsRouter, ProductRouter } from "./routes/index.js";
import { InternalServerError } from './errors/internalServerError.js';
import { BadRequest } from './errors/badRequest.js';

const PORT = 8080


const app = express()

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use("/api/products", ProductRouter)

app.use("/api/carts", CartsRouter)

app.use((err, req, res, next) => {
    if (err instanceof BadRequest) {
        return res.status(400).json({ message: err.message });
    }
    if (err instanceof InternalServerError) {
        return res.status(500).json({ message: err.message });
    }
   
    return res.status(500).json({ message: 'Ha ocurrido un error interno en el servidor.' });
});

app.listen(PORT, ()=>{

    console.log(`http://localhost:${PORT}/`)
})

