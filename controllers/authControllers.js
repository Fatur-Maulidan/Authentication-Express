require('dotenv').config();
const userModel = require('../models/userModels');
const {createJWT} = require('../helpers/createJWTs');

const auth = async (req, res) => {
    try {
        const payload = req.body;
        const user = await userModel.getUserByEmail(payload.email);

        if(user.password !== payload.password) {
            return res.status(422).json({
                status : 422,
                message : 'Bad Request',
                errors : 'Invalid login',
            })
        }

        var token = createJWT(payload);

        return res.json({
            status : 200,
            message : 'Success',
            data : {
                payload,
                accessToken : token
            }
        });
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    auth,
}