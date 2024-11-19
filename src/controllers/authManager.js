// estarian los metodos relacionados al login, registro y lo

import {comparePassword, hashPassword} from "../utils/byScript.js"
export class AuthManager {

    constructor(){

        this.path = __dirname;

    }
    async validateLogin(email, password) {
        try {

            const user = await getUserById(email);

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

            const userRegister = {...data, password:hashPassowrd};

            return await saveUserInDb(userRegister);

        } catch (error) {

            throw error
        }
    }
}
