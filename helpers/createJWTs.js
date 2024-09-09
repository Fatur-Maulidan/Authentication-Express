const jwt = require('jsonwebtoken');

const createJWT = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
}

module.exports = {
    createJWT
}