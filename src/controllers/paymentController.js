import paymentService from "../services/paymentService.js";

class PaymentController {
    async paymentIntent(req, res, next) {
        try {
            const url = await paymentService.paymentIntent(req.body.orderData, req.body.userData);

            res.json(url);

        } catch (error) {
            next(error)
        }
    }
}

export default new PaymentController;