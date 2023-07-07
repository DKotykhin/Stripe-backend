import mongoose from "mongoose";

const { Schema, model } = mongoose;

const storeSchema = new Schema({
    itemName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: String,
    image: String,
    tm: String,
    country: String,
    weight: Number,
    hidden: {
        type: Boolean,
        default: false,
    },
    position: {
        type: Number,
        default: 0,
    }
},
    {
        timestamps: true,
        versionKey: false,
        collection: 'Store',
    }
);

export default model('Store', storeSchema);