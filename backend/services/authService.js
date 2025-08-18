const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');

const generateAuthToken = (user) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
    });
    return token;
};

const generateRefreshToken = (user) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
    });
    return token;
};

const createLoginSession = async (user) => {
    const accessToken = generateAuthToken(user);
    const refreshToken = generateRefreshToken(user);
    const tokenData = {
        userId: user._id,
        accessToken,
        refreshToken
    };
    await userRepository.saveToken(tokenData);
    return { accessToken, refreshToken };
};

const refreshAccessToken = async (refreshToken) => {
    if (!refreshToken) {
        throw new Error('Refresh token is required');
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await userRepository.findUserById(decoded._id);
    if (!user) {
        throw new Error('User not found');
    }
    const newAccessToken = generateAuthToken(user);
    const updatedToken = await userRepository.refreshAccessToken(user._id, newAccessToken);
    if (!updatedToken) {
        throw new Error('Failed to refresh access token');
    }
    return { user, accessToken: updatedToken.accessToken, refreshToken: updatedToken.refreshToken };
};

const registerUser = async (userData) => {
    const user = await userRepository.createUser(userData);
    const { accessToken, refreshToken } = await createLoginSession(user);
    return { user, accessToken, refreshToken };
};

const loginUser = async (username, password) => {
    const user = await userRepository.findUserByUsername(username);
    if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid username or password');
    }    
    const { accessToken, refreshToken } = await createLoginSession(user);
    return { user, accessToken, refreshToken };
};

const logoutUser = async (userId) => {
    const token = await userRepository.deleteToken(userId);
    if (!token) {
        throw new Error('Token not found');
    }
    return { message: 'User logged out successfully' };
}


module.exports = {
    generateAuthToken,
    generateRefreshToken,
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
};