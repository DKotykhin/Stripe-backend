import userService from '../services/userService.js';

class UserController {
    async loginByToken(req, res, next) {
        try {
            const user = await userService.loginByToken(req.userId);
            const { passwordHash, ...rest } = user._doc;

            res.json({
                user: rest,
                message: `User ${user.userName} successfully logged via token`,
            });
        } catch (error) {
            next(error)
        }
    }

    async register(req, res, next) {
        try {
            const { user, token } = await userService.register(req.body);
            const { passwordHash, ...rest } = user._doc;

            res.status(201).send({
                user: rest,
                token,
                message: `User ${user.userName} successfully created`,
            });
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { user, token } = await userService.login(req.body);
            const { passwordHash, ...rest } = user._doc;

            res.json({
                user: rest,
                token,
                message: `User ${user.userName} successfully logged`,
            });
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { orderStatus, userStatus } = await userService.delete(req.userId);

            res.json({
                userStatus,
                orderStatus,
                message: 'User successfully deleted'
            });
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController;