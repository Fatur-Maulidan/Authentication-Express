const userModel = require('../models/userModels');

const index = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        if(!users) {
            return res.status(404).json({
                status: 404,
                message: 'User Not Found'
            });
        }

        return res.json(users);
    } catch (error) {
        res.json(error);
    }
}

const show = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);
        
        if(!user) {
            return res.status(404).json({
                status: 404,
                message: 'User Not Found'
            });
        }
        
        return res.status(200).json({
            status : 200,
            message: 'User Success Get',
            data: user
        });

        
    } catch (error) {
        res.json(error);
    }
}

const store = async (req, res) => {
    try {
        const user = await userModel.createUser(req.body);
        return res.status(200).json({
            status: 200,
            message: 'User Success Create',
        })
    } catch (error) {
        res.json(error);
    }
}

const update = async (req, res) => {
    try {
        const user = await userModel.updateUser(req.params.id, req.body);
        return res.status(200).json({
            status: 200,
            message: 'User Success Updated',
        })
    } catch (error) {
        res.json(error);
    }
}

const destroy = async (req, res) => {
    try {
        const user = await userModel.deleteUser(req.params.id);
        res.status(200).json({
            status: 200,
            message: 'User Success Deleted',
        })
    } catch (error) {
        res.json(error);
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}