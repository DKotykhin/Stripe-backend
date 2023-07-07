import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    deliveryWay: String,
    address: String,
    comment: String,
    orderSum: Number,
    orderQuantity: Number,
    averageSum: Number,
    payment_intent: String,
    orderData: [
        {            
            itemName: String,
            price: Number,
            quantity: Number,
            weight: Number,
            image: String,
            itemId: {
                type: Schema.Types.ObjectId,
                ref: 'Store',
            },
        }
    ]
},
    {
        timestamps: true,
        versionKey: false,
        collection: 'Order',
    }
);

export default model('Order', orderSchema);