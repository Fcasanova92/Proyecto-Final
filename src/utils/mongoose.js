import {dirname, resolve} from "path"
import { fileURLToPath } from "url";
import mongoose from "mongoose"
import { DB_USER, DB_PASSWORD } from "./env.js"

export const __dirname = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export const mongooseConnect = async ()=> {

    const mongoUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@clustercoder.oiit0.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCoder`

    try {

        await mongoose.connect(mongoUri)

            console.log("Conectado exitosamente a la base de datos");

    }catch (error) {

        console.log(" error en la conexion a la base de datos ", error)

        process.exit()
        
    }
}


