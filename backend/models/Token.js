const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    accessToken: {
        type: String,
        required: [true, 'Token is required'],
        unique: true
    },
    refreshToken: {
        type: String,
        required: [true, 'Refresh token is required'],
        unique: true
    }
});

module.exports = mongoose.model('Token', tokenSchema);