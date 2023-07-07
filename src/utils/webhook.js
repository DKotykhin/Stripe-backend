import Stripe from "stripe";

import 'dotenv/config';
import orderService from "../services/orderService.js";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.WEBHOOK_SECRET_KEY;

export const webhook = (request, response) => {
    let event = request.body;
    let data;
    let eventType;

    if (endpointSecret) {
        const signature = request.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                request.body,
                signature,
                endpointSecret
            );
            console.log('webhook verified');
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            return response.sendStatus(400);
        }
        data = event.data.object;
        eventType = event.type;
    };

    if (eventType === 'checkout.session.completed') {
        stripe.customers.retrieve(data.customer)
            .then(customer => {
                // console.log('customer: ', customer);
                // console.log('data: ', data);
                orderService.writeOrderData(customer, data);
            })
            .catch(err => console.log(err.message))
    };

    response.send();
};









// Handle the event
// switch (event.type) {
//     case 'payment_intent.succeeded':
//         const paymentIntent = event.data.object;
//         console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
//         // Then define and call a method to handle the successful payment intent.
//         // handlePaymentIntentSucceeded(paymentIntent);
//         break;
//     case 'payment_method.attached':
//         const paymentMethod = event.data.object;
//         console.log('payment_method.attached');
//         // Then define and call a method to handle the successful attachment of a PaymentMethod.
//         // handlePaymentMethodAttached(paymentMethod);
//         break;
//     default:
//         // Unexpected event type
//         console.log(`Unhandled event type ${event.type}.`);
// };