const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "this is actor GET REQUEST"
    });
});

router.post('/', (req, res, next) => {
    const actor = {
        name: req.body.name,
        birthday: req.body.birthday,
        country: req.body.country
    }
    res.status(201).json({
        message: "Handling POST requests to  /actors",
        createdActor: actor
    });
});

module.exports = router;