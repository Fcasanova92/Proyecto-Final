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

cartSchema.pre('find', function(){

    this.populate('products.idProduct')
})

cartSchema.pre('findOne', function() { 
    this.populate('products.idProduct');
});


export const cartModel = mongoose.model(cartCollection, cartSchema);