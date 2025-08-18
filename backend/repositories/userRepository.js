const User = require('../models/User');
const Token = require('../models/Token');

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

const saveToken = async (tokenData) => {
    const existingToken = await Token.findOne({ userId: tokenData.userId });
    if (existingToken) {
        existingToken.accessToken = tokenData.accessToken;
        existingToken.refreshToken = tokenData.refreshToken;
        return await existingToken.save();
    }
    return await Token.create(tokenData);
};

const refreshAccessToken = async (userId, newAccessToken) => {
    return await Token.findOneAndUpdate(
        { userId },
        { accessToken: newAccessToken },
        { new: true }
    );
};

const deleteToken = async (userId) => {
    return await Token.findOneAndDelete({ userId });
};

module.exports = {
    createUser, 
    findUserByUsername,
    findUserById,
    updateUser,
    deleteUser,
    saveToken,
    refreshAccessToken,
    deleteToken
};

