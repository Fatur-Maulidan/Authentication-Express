const userModel = require('../models/userModels');
const {body} = require('express-validator');

const validationAuthData = [
    body('email').notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required').bail()
        .isLength({min: 3}).withMessage('Password must be at least 3 characters long'),
]

const validationUserData = [
    body('email').trim().normalizeEmail().notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Email is not valid').custom(async (email) => {
            const existingUser = await userModel.getUserByEmail(email);
            if(existingUser) {
                return Promise.reject('Email already in use');
            }
        }),
    body('password').notEmpty().withMessage('Password is required').bail()
        .isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
]

const validationUpdateUser = [
    body('email').trim().normalizeEmail().notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required').bail()
        .isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
]

module.exports = {
    validationAuthData,
    validationUserData,
    validationUpdateUser
}