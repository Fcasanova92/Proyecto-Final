import mongoose, { Types } from "mongoose";

const productCollection = "products"


const productSchema = new mongoose.Schema({

    id: {
        type: Number,
        unique: true,
        required: true // Añade required si el id siempre es necesario
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true // Puedes definir un valor predeterminado
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String
    }
});


export const productModel = mongoose.model(productCollection, productSchema)