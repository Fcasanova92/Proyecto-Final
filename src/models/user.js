import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    
    uid: {
        type: String,
        unique: true,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default:"user"

    },
    password: {
        type: String,
        required: true,
        unique:true
    }
});


export const userModel = mongoose.model(userCollection, userSchema);