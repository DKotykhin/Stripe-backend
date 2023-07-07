import { body } from 'express-validator';

const password = body('password')
    .isString().withMessage('Incorrect data format')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 chars long')
    .isLength({ max: 100 }).withMessage('Password must be maximum 100 chars long')
    .trim();

const userName = body('userName')
    .isString().withMessage('Incorrect name format')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 chars long')
    .isLength({ max: 100 }).withMessage('Name must be maximum 100 chars long')
    .trim();

const email = body('email')
    .optional()
    .isEmail().withMessage('Incorrect email format')
    .normalizeEmail();

class UserValidation {
    register = [email, password, userName];
    login = [email, password];
    name = [userName];
    password = [password];
}

export { UserValidation };
