const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "this is movies GET REQUEST"
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "this is movies post REQUEST"
    });
});

module.exports = router;