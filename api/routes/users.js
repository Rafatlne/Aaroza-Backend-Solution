const express = require('express');
const router = express.Router();

router.post('/signup', (req, res, next) => {
    res.status(200).json({
        message: "this is user post signup"
    });
});

router.post('/login', (req, res, next) => {
    res.status(200).json({
        message: "this is  user post login"
    });
});

module.exports = router;