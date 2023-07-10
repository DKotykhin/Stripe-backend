import Stripe from "stripe";

import 'dotenv/config';

import OrderModel from '../models/OrderModel.js';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const imageBaseUrl = process.env.IMAGE_BASE_URL;

class PaymentService {

    async paymentIntent(orderData, userData, userId) {
        const customer = await stripe.customers.create({
            metadata: {
                orderData: JSON.stringify(orderData),
                userData: JSON.stringify(userData),
                userId,
            },
        });

        const line_items = orderData?.map(item => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.itemName,
                        images: [imageBaseUrl + item.image],
                        metadata: {
                            weight: item.weight,
                        },
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            }
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            customer: customer.id,
            mode: 'payment',
            success_url: 'https://stripe-frontend-six.vercel.app/thanks',
            cancel_url: 'https://stripe-frontend-six.vercel.app/cancel',
        });

        return { url: session.url };
    }

    async paymentRefund(amount, orderId) {
        const order = await OrderModel.findById(orderId);
        const refund = await stripe.refunds.create({
            payment_intent: order.payment_intent,
            amount: amount * 100,
        });

        return { refund };
    }
}

export default new PaymentService;