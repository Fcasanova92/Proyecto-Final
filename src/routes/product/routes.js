import { Router } from "express";

export const router = Router()

// obtener todos los productos
// Obtener todos los productos
router.get("/", (req, res) => {
    res.send('Aquí están todos los productos');
});

// Agregar un producto
router.post("/", (req, res) => {
    res.send('Producto agregado');
});

// Obtener un producto por id
router.get("/:pid", (req, res) => {
    res.send('Producto con ID ' + req.params.pid);
});

// Actualizar un producto
router.patch("/:pid", (req, res) => {
    res.send('Producto con ID ' + req.params.pid + ' actualizado');
});

// Borrar un producto
router.delete("/:pid", (req, res) => {
    res.send('Producto con ID ' + req.params.pid + ' eliminado');
});