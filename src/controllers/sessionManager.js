import { __dirname } from "../utils/mongoose.js";

// obtener data del usuario para ver en el perfil
// cambiar contrasena

export class SessionManager {
    constructor() {
        this.path = __dirname;
    }

    async getDataUserById(id) {
       return
    }

    async getAllUsers(id) {
       return
    }

    async deleteUser(id) {
       return
    }

    // este update puede ser del email o la contraseña

    async updateUser(id, updateData) {
        return
    }
}