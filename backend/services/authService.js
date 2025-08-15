const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');

const generateAuthToken = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
    });
    return token;
};

const generateRefreshToken = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
    });
    return token;
};

const registerUser = async (userData) => {
    const user = await userRepository.createUser(userData);
    const token = generateAuthToken(user);
    return { user, token };
};

const loginUser = async (username, password) => {
    const user = await userRepository.findUserByUsername(username);
    if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid username or password');
    }
    const token = generateAuthToken(user);
    return { user, token };
};

const logoutUser = async (userId) => {
    // In a real application, you might want to handle token invalidation here
    return { message: 'User logged out successfully' };
}


module.exports = {
    generateAuthToken,
    generateRefreshToken,
    registerUser,
    loginUser,
    logoutUser
};