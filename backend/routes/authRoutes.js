const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const express = require('express');

const router = express.Router();

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.post('/logout', authMiddleware.authMiddleware, authController.logoutUser);

module.exports = router;