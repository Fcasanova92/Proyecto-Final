import mongoose from "mongoose";

import mongoosePaginate from 'mongoose-paginate-v2'

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

 
productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);