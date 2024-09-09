const {validationResult} = require("express-validator");

const checkIfPayloadIsCorrect = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status : 422,
            message : 'Bad Request',
            errors : errors.array()
        });
    }
    next();
}

module.exports = {
    checkIfPayloadIsCorrect
}