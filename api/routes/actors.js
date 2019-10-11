const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const {
    Actor
} = require('../models/actor');

// GET ROUTE
router.get("/", (req, res, next) => {

    Actor.find()
        .select("name birthday country")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(400).json({
                    message: 'No valid entry found for this route'
                });
            }

        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


// POST ROUTE
router.post('/', (req, res, next) => {
    const actor = new Actor({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        birthday: req.body.birthday,
        country: req.body.country
    });

    actor
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created Product successfully',
                createdActor: {
                    name: result.name,
                    birthday: result.birthday,
                    country: result.country,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/actors/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;