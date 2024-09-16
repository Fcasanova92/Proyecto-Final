import { Router } from "express";

export const router = Router();

router.get("/", async (req, res, next) => {

    res.render('product')
   
});

