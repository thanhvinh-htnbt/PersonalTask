const User = require('../models/User');

const createUser = async (userData) => {
    return await User.create(userData);
};

const findUserByUsername = async (username) => {
    return await User.findOne({ username }).select('+password');
};

const findUserById = async (userId) => {
    return await User.findById(userId);
};

const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true
    }); 
};

const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

module.exports = {
    createUser, 
    findUserByUsername,
    findUserById,
    updateUser,
    deleteUser
};

