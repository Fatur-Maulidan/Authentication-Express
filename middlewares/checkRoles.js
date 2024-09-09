const userModel = require('../models/userModels');

const checkRoles = async (req, res, next) => {
    const data = await userModel.getUserByEmail(req.user.email);
    if (data.role.role !== 'Admin') {
        return res.status(403).json({
            message: 'Forbidden'
        });
    }

    next();
}

module.exports = {
    checkRoles
}