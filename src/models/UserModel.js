import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
    },
    address: String,
    phone: String,
    passwordHash: String,
    avatarURL: String,
},
    {
        timestamps: true,
        versionKey: false,
        collection: 'User',
    }
);

export default model('User', userSchema);