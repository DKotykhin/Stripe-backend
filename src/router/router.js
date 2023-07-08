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

router.post("/create-payment-intent", checkAuth, paymentController.paymentIntent);
router.post("/payment-refund", checkAuth, paymentController.paymentRefund);

router.get('/user/me', checkAuth, userController.loginByToken);
router.delete('/user/me', checkAuth, userController.delete);
router.get('/user/orders', checkAuth, orderController.userOrders);

export default router;