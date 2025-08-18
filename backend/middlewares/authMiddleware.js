const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).json({ success: false, message: 'No token provided' });
            }
            jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ success: false, message: 'Failed to authenticate token' });
                }
                req.user = decoded; 
                next();
            });
        }
        catch (error) {
            return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    } 
};

module.exports = { authMiddleware };