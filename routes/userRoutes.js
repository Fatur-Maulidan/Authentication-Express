const express = require('express');
const AuthController = require('../controllers/authControllers');
const UserController = require('../controllers/userControllers');
const router = express.Router();

const {
    validationAuthData,
    validationUserData
} = require('../validations/userValidations');
const {checkIfPayloadIsCorrect} = require('../helpers/checkValidations');

const { checkTokenIsValid } = require('../middlewares/authMiddleware');
const {checkRoles} = require('../middlewares/checkRoles');

// Auth
router.post('/login', validationAuthData, checkIfPayloadIsCorrect,  AuthController.auth)

// Get all Users

router.get('/', checkTokenIsValid, UserController.index);
router.post('/', checkTokenIsValid, checkRoles, validationUserData, checkIfPayloadIsCorrect, UserController.store);
router.get('/:id', checkTokenIsValid, UserController.show);
router.put('/:id', checkTokenIsValid, checkRoles, UserController.update);
router.delete('/:id', checkTokenIsValid, checkRoles, UserController.destroy);

module.exports = router;