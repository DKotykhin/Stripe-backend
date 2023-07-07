import orderService from "../services/orderService.js";

class OrderController {
    async userOrders(req, res, next) {
        try {
            const result = await orderService.findOrdersByUser(req.userId);

            res.json(result);

        } catch (error) {
            next(error)
        }
    }
}

export default new OrderController;