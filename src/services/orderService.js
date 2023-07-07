import { Types } from 'mongoose';

import OrderModel from '../models/OrderModel.js';
import UserModel from "../models/UserModel.js";

import ApiError from '../error/apiError.js';

class OrderService {
    async writeOrderData(customer, data) {
        const { email, metadata } = customer;
        const { amount_total, payment_intent } = data;

        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.notFound("Can't find user")
        }
        const orderData = JSON.parse(metadata.order);
        const userData = JSON.parse(metadata.user);
        const { deliveryWay, address, comment } = userData;

        const orderQuantity = orderData.reduce((acc, value) => acc + value.quantity, 0);
        const orderSum = amount_total / 100;
        const averageSum = Math.round(orderSum / orderQuantity);

        const doc = new OrderModel({
            userId: user._id,
            payment_intent,
            deliveryWay,
            address,
            comment,
            orderSum,
            orderQuantity,
            averageSum,
            orderData,
        });
        await doc.save();
    }

    async findOrdersByUser(id) {
        const orders = await OrderModel.find({ userId: id }).sort({ createdAt: -1 });

        if (orders.length) {
            const ordersStatistic = await OrderModel.aggregate([
                {
                    $match: { userId: new Types.ObjectId(id) }
                },
                {
                    $group: {
                        _id: '$userId',
                        count: {
                            $sum: 1,
                        },
                        sum: {
                            $sum: '$orderSum',
                        },
                        average: {
                            $avg: '$orderSum',
                        },
                    }
                }
            ]);
            const statistic = {
                totalCount: ordersStatistic[0].count,
                totalSum: ordersStatistic[0].sum,
                averageSum: Math.round(ordersStatistic[0].average),
            };

            return { orders, statistic };
        } else {
            return {
                orders: [],
                statistic: {},
                message: "You don't have any orders yet"
            }
        }
    }
}

export default new OrderService;