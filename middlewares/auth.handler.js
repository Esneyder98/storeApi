const jwt = require('jsonwebtoken');
const config = require('../datebase/config/config');

function checkApiKey(req,res,next) {
    const authHeader = req.headers.authorization;
    const revokedTokens = []; 
    const token = authHeader;
    let verify;
    try {
        const secret = config.development.jwtSecret;
        verify = jwt.verify(token, secret);
        console.log(verify);
        next();
    } catch (error) {
        console.log(verify);
        return res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = checkApiKey;