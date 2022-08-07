const User = require('../model/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
    if (!req?.params?._id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params._id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params._id} not found` });
    }
    const result = await user.deleteOne({ _id: req.params._id });
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?._id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params._id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params._id} not found` });
    }
    res.json(user);
}


module.exports = {
    getAllUsers,
    deleteUser,
    getUser
    
}