import mongoose, { Types } from "mongoose";

const cartCollection = "carts"


const cartSchema = mongoose.Schema({

    id: {
        type:Number,
        required:true,
        unique:true
    }, 
    
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products', // Hace referencia al modelo de productos
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1, // La cantidad mínima es 1
            default: 1
        }
    }]
})


export const productModel = mongoose.model(cartCollection, cartSchema)