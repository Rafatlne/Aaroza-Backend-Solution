const jwt = require('jsonwebtoken');
const config = require('../config/secret.json');

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, config.SECRET_KEY.JWT_KEY);
        next();
    } catch(error) {
        return res.status(401).json({
            message: "check-auth failed"
        });
    }

     
};