const jwt = require("jsonwebtoken");


const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    try {
        req.user =  jwt.verify(token, 'mySecretJWTKey');
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}


module.exports = authenticateUser;