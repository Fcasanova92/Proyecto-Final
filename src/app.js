import express from "express";
import { CartsRouter, ProductRouter } from "./routes";

const PORT = 8080

const app = express()

app.use(express.json());

app.use("/api/products", ProductRouter)

app.use("/api/carts", CartsRouter)

app.listen(PORT, ()=>{

    console.log(`Example app listening on port  http://localhost:${PORT}/`)
})

