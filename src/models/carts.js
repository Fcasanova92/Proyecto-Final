import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    cid: {
        type: Number,
        required: true,
        unique: true
    }, 
    products: [{
        idProduct: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products', 
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1 
        }
    }]
});


export const cartModel = mongoose.model(cartCollection, cartSchema);