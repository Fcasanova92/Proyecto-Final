import { Router } from 'express';

export const router = Router()

// obtener todos los productos
router.get("/", (req, res )=>{

    res.send('This is a POST request');
})

// agregar los productos

router.post("/", (req, res)=>{

    res.send('This is a POST request');

} )

// obtener un producto por id


router.get("/:cid", (req, res) => {

    res.send('This is a POST request');
})

router.post("/:cid/product/:pid ", (req, res)=>{

    res.send('This is a POST request');

})

;

// solo debe de contener el id del producto y la cantidad

router.delete("/:cid", (req, res)=>{

    res.send('This is a POST request');

})