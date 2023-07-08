import paymentService from "../services/paymentService.js";

class PaymentController {
    async paymentIntent(req, res, next) {
        try {
            const url = await paymentService.paymentIntent(req.body.orderData, req.body.userData, req.userId);

            res.json(url);

        } catch (error) {
            next(error)
        }
    }

    async paymentRefund(req, res, next) {
        try {
            const refund = await paymentService.paymentRefund(req.body.amount, req.body.orderId);

            res.json(refund);

        } catch (error) {
            next(error)
        }
    }
}

export default new PaymentController;