// estarian los metodos relacionados al login, registro y lo

import { getUserByEmail, saveUserInDb } from "../db/querys/userQuerys.js";
import {comparePassword, hashPassword} from "../utils/byScript.js"
import {uidGenerator} from "../utils/uidGenerator.js"
export class AuthManager {

    constructor(){

        this.path = __dirname;

    }
    async validateLogin(email, password) {
        try {

            const user = await getUserByEmail(email);

            if(!user){

                throw new BadRequest("Email incorrecto");
                
            }

            const validatePassword = comparePassword(password, user.password);

            if(!validatePassword){

                throw new BadRequest("Contraseña incorrecta");
                
            }

            return true

        } catch (error) {

            throw error
        }
    }

    async validateRegister(data) {

        const {password, email, ...data} = data
        try {

            const user = await getUserById(email);

            if(user){

                throw new BadRequest("El email se encuentra registrado");
                
            }

            const hashPassowrd = hashPassword(password);

            const uid = uidGenerator();

            const userRegister = {...data, password:hashPassowrd, uid};

            return await saveUserInDb(userRegister);

        } catch (error) {

            throw error
        }
    }
}
