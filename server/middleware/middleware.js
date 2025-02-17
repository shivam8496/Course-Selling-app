const jwt = require('jsonwebtoken');
require('dotenv').config();  // Load environment variables

const secret = process.env.JWT_SECRET; // Fetch secret from .env

function generateToken(data) {
    return jwt.sign(data, secret);
}

function jwtAuthenticate(req, res, next) {
    var data = req.headers.authorize;
    if (data) {
        var token = data.split(' ')[1];
        jwt.verify(token, secret, (err, original) => {
            if (err) return res.status(403).json({ message: "error occurred" });
            req.user = original;
            next();
        });
    } else {
        res.status(404).json({ message: "wrong bearer Token" });
    }
}

module.exports = { generateToken, jwtAuthenticate };
