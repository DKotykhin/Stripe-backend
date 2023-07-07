import Stripe from "stripe";

import 'dotenv/config';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

class PaymentService {

    async paymentIntent(data, user) {
        const customer = await stripe.customers.create({
            metadata: {
                order: JSON.stringify(data),
                user: JSON.stringify(user),
            },
        });

        const line_items = data?.map(item => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.itemName,
                        images: [item.image],
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
            success_url: 'http://google.com',
            cancel_url: 'http://localhost:4242/cancel',
        });

        return { url: session.url };
    }
}

export default new PaymentService;