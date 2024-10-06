import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
    pid: {
        type: Number,
        unique: true,
        required: true
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
        type: String,
        default: 'Disponible'
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String
    },
    thumbnails: [String]
});


export const productModel = mongoose.model(productCollection, productSchema);