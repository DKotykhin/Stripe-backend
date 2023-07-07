import express from "express";

import { paymentController, userController, storeController, orderController } from "../controllers/_index.js";
import { UserValidation, validationErrors } from "../validations/_index.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const userValidation = new UserValidation;

const router = express.Router();

router.get('/store', storeController.getAll);
router.get('/store/:id', storeController.getOne);

router.post('/auth/register', userValidation.register, validationErrors, userController.register);
router.post('/auth/login', userValidation.login, validationErrors, userController.login);

router.post("/create-payment-intent", paymentController.paymentIntent);

router.get('/user/me', checkAuth, userController.loginByToken);
router.delete('/user/me', checkAuth, userController.delete);
router.get('/user/orders', checkAuth, orderController.userOrders);

export default router;





    // Create a PaymentIntent with the order amount and currency
    // const paymentIntent = await stripe.paymentIntents.create({
    //     amount,
    //     currency: "usd",
    //     automatic_payment_methods: {
    //         enabled: true,
    //     },
    // });

    // res.send({
    //     clientSecret: paymentIntent.client_secret,
    // });

    // const customers = await stripe.customers.list();
    // res.send({
    //     customers,
    //     });

    // const refund = await stripe.refunds.create({
    //     payment_intent: 'pi_3NQqbHLsaoR3fGdD0XX5Eqlm',
    //     amount: 1000,
    // });

    // res.send({ refund })