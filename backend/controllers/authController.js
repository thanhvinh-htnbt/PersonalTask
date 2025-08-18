const authService = require('../services/authService');

const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = await authService.registerUser(userData);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await authService.loginUser(username, password);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        const userId = req.user._id; 
        await authService.logoutUser(userId);
        res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ success: false, message: 'Refresh token is required' });
        }
        const user = await authService.refreshAccessToken(refreshToken);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken
};