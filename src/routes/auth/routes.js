import { Router } from "express";

export const router = Router();

router.post('/login', (req, res, next) => {

    const {email, password} = req.body

    const validate = validateLogin(email, password)

    if(validate){
       return res.status(200).json({message:"Logeo exitoso"})
    }

})

router.post('/register', (req, res, next) => {

    const data = req.body

    const validate = validateRegister(data)

    if(validate){

       return res.status(200).json({message:"Registro exitoso"})
    }

})

router.post('/logout'), (req, res, next) => {

    return
}



