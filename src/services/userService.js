import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from "../models/UserModel.js";
import OrderModel from '../models/OrderModel.js';
import ApiError from '../error/apiError.js';
import { findUserById } from '../utils/findUserById.js';

import 'dotenv/config';

const generateToken = (_id) => {
    return jwt.sign(
        { _id },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "1d" }
    )
};
const createPasswordHash = async (password) => {
    const salt = await bcrypt.genSalt(5);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
};

class UserService {

    async loginByToken(id) {
        const user = await findUserById(id);

        return user;
    }

    async register(data) {
        const { email, userName, password } = data;
        const candidat = await UserModel.findOne({ email });
        if (candidat) {
            throw ApiError.badRequest(`User ${email} already exist`)
        }
        const passwordHash = await createPasswordHash(password);
        const user = await UserModel.create({
            userName,
            email,
            passwordHash,
        });
        const token = generateToken(user._id);

        return { user, token };
    }

    async login(data) {
        const { email, password } = data;
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.notFound("Can't find user")
        }

        const isValidPass = await bcrypt.compare(password, user.passwordHash);
        if (!isValidPass) {
            throw ApiError.badRequest('Incorrect login or password')
        }
        const token = generateToken(user._id);

        return { user, token };
    }

    async delete(_id) {
        await findUserById(_id);

        const orderStatus = await OrderModel.deleteMany({ userId: _id });
        const userStatus = await UserModel.deleteOne({ _id });

        return { orderStatus, userStatus };
    }
}

export default new UserService;